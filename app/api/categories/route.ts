import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export interface SubcategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: SubcategoryItem[];
}

const CATEGORIES_FILE_PATH = path.join(process.cwd(), "data", "store_categories.json");
const BACKUP_CATEGORIES_FILE_PATH = path.join(process.cwd(), "public", "uploads", "store_categories.json");

const DEFAULT_CATEGORIES: CategoryItem[] = [];

async function readCategoriesFromFile(): Promise<CategoryItem[]> {
  try {
    const data = await readFile(CATEGORIES_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
  } catch {}

  try {
    const data = await readFile(BACKUP_CATEGORIES_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
  } catch {}

  return [];
}

async function writeCategoriesToFile(categories: CategoryItem[]): Promise<void> {
  try {
    const dataDir = path.dirname(CATEGORIES_FILE_PATH);
    await mkdir(dataDir, { recursive: true });
    await writeFile(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), "utf-8");
  } catch {}

  try {
    const backupDir = path.dirname(BACKUP_CATEGORIES_FILE_PATH);
    await mkdir(backupDir, { recursive: true });
    await writeFile(BACKUP_CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), "utf-8");
  } catch {}
}

export async function GET() {
  try {
    // 1. Fetch from PostgreSQL database as the primary source of truth
    let dbCategories: any[] = [];
    try {
      dbCategories = await prisma.category.findMany({
        orderBy: { createdAt: "asc" },
      });
    } catch (dbErr) {
      console.warn("Prisma category fetch warning:", dbErr);
    }

    // 2. Read subcategories / file metadata if available
    let fileCategories: CategoryItem[] = [];
    try {
      const data = await readFile(CATEGORIES_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) fileCategories = parsed;
    } catch {}

    const fileMap = new Map(fileCategories.map((c) => [c.slug.toLowerCase(), c]));

    // If database has categories, map them directly from PostgreSQL
    if (dbCategories.length > 0) {
      const mapped: CategoryItem[] = dbCategories.map((cat) => {
        const fileMatch = fileMap.get(cat.slug.toLowerCase());
        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || fileMatch?.description || "",
          image: cat.imageUrl || fileMatch?.image || undefined,
          subcategories: fileMatch?.subcategories || [],
        };
      });
      return NextResponse.json({ success: true, categories: mapped });
    }

    // If database has no categories but file has user categories:
    if (fileCategories.length > 0) {
      return NextResponse.json({ success: true, categories: fileCategories });
    }

    // No categories in database: return clean empty array []
    return NextResponse.json({ success: true, categories: [] });
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json({ success: true, categories: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, slug, description, image, imageUrl, subcategories } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const cleanSlug = slug || name.trim().toLowerCase().replace(/\s+/g, "-");
    const finalImage = image !== undefined ? image : imageUrl;

    const currentList = await readCategoriesFromFile();
    const existingIndex = currentList.findIndex(
      (c) => (id && c.id === id) || c.slug.toLowerCase() === cleanSlug.toLowerCase()
    );

    const updatedCat: CategoryItem = {
      id: id || (existingIndex >= 0 ? currentList[existingIndex].id : `cat-${Date.now()}`),
      name: name.trim(),
      slug: cleanSlug,
      description: description || "",
      image: finalImage || undefined,
      subcategories: Array.isArray(subcategories) ? subcategories : (existingIndex >= 0 ? currentList[existingIndex].subcategories || [] : []),
    };

    if (existingIndex >= 0) {
      currentList[existingIndex] = updatedCat;
    } else {
      currentList.push(updatedCat);
    }

    await writeCategoriesToFile(currentList);

    // Also attempt Prisma update if available
    try {
      await prisma.category.upsert({
        where: { slug: cleanSlug },
        update: {
          name: updatedCat.name,
          description: updatedCat.description,
          ...(finalImage !== undefined ? { imageUrl: finalImage } : {}),
        },
        create: {
          name: updatedCat.name,
          slug: cleanSlug,
          description: updatedCat.description,
          imageUrl: finalImage || null,
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      category: updatedCat,
      categories: currentList,
    });
  } catch (error) {
    console.error("Create/update category error:", error);
    return NextResponse.json({ success: false, error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ error: "Missing category id or slug" }, { status: 400 });
    }

    const currentList = await readCategoriesFromFile();
    const filtered = currentList.filter(
      (c) =>
        c.id !== id &&
        c.slug.toLowerCase() !== (slug || "").toLowerCase() &&
        c.name.toLowerCase() !== (id || "").toLowerCase()
    );

    await writeCategoriesToFile(filtered);

    // Also attempt Prisma delete
    try {
      await prisma.category.deleteMany({
        where: {
          OR: [
            ...(id ? [{ id }] : []),
            ...(slug ? [{ slug }] : []),
            ...(id ? [{ name: id }] : []),
          ],
        },
      });
    } catch {}

    return NextResponse.json({ success: true, categories: filtered });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete category" }, { status: 500 });
  }
}

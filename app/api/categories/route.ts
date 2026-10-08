import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: "asc" },
    });
    const formatted = categories.map((cat) => ({
      ...cat,
      image: cat.imageUrl || undefined,
    }));
    return NextResponse.json({ success: true, categories: formatted });
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, image, imageUrl } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const cleanSlug = slug || name.trim().toLowerCase().replace(/\s+/g, "-");
    const finalImage = image !== undefined ? image : imageUrl;

    const category = await prisma.category.upsert({
      where: { slug: cleanSlug },
      update: {
        name,
        description,
        ...(finalImage !== undefined ? { imageUrl: finalImage } : {}),
      },
      create: {
        name,
        slug: cleanSlug,
        description,
        imageUrl: finalImage || null,
      },
    });

    return NextResponse.json({
      success: true,
      category: { ...category, image: category.imageUrl || undefined },
    });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ success: false, error: "Failed to create category" }, { status: 500 });
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

    // Delete category from PostgreSQL if no products prevent it
    const deleteResult = await prisma.category.deleteMany({
      where: {
        OR: [
          ...(id ? [{ id }] : []),
          ...(slug ? [{ slug }] : []),
          ...(id ? [{ name: id }] : []),
        ],
      },
    });

    return NextResponse.json({ success: true, deletedCount: deleteResult.count });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete category from DB" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { ProductItem } from "@/lib/mock-data";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "data", "store_products.json");
const BACKUP_PRODUCTS_FILE_PATH = path.join(process.cwd(), "public", "uploads", "store_products.json");

async function readProductsFromFile(): Promise<ProductItem[]> {
  try {
    const data = await readFile(PRODUCTS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    try {
      const data = await readFile(BACKUP_PRODUCTS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}

async function writeProductsToFile(products: ProductItem[]): Promise<void> {
  const dataDir = path.dirname(PRODUCTS_FILE_PATH);
  await mkdir(dataDir, { recursive: true });
  await writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");

  try {
    const backupDir = path.dirname(BACKUP_PRODUCTS_FILE_PATH);
    await mkdir(backupDir, { recursive: true });
    await writeFile(BACKUP_PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch {}
}

export async function GET() {
  try {
    const products = await readProductsFromFile();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ success: true, products: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const product: ProductItem = await request.json();
    if (!product || !product.id || !product.title) {
      return NextResponse.json({ success: false, error: "Invalid product data" }, { status: 400 });
    }

    const products = await readProductsFromFile();

    // Enforce unique slug across different products
    if (product.slug) {
      const slugExists = products.some((p) => p.slug === product.slug && p.id !== product.id);
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: `A product with slug "${product.slug}" already exists.` },
          { status: 409 }
        );
      }
    }

    const filtered = products.filter((p) => p.id !== product.id);
    const updated = [product, ...filtered];

    await writeProductsToFile(updated);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Failed to save product:", error);
    return NextResponse.json({ success: false, error: "Failed to save product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const product: ProductItem = await request.json();
    if (!product || !product.id) {
      return NextResponse.json({ success: false, error: "Invalid product data" }, { status: 400 });
    }

    const products = await readProductsFromFile();

    // Enforce unique slug across different products
    if (product.slug) {
      const slugExists = products.some((p) => p.slug === product.slug && p.id !== product.id);
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: `A product with slug "${product.slug}" already exists.` },
          { status: 409 }
        );
      }
    }

    const updated = products.map((p) => (p.id === product.id ? product : p));

    await writeProductsToFile(updated);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json({ error: "Missing product id or slug" }, { status: 400 });
    }

    const products = await readProductsFromFile();
    const updated = products.filter((p) => p.id !== id && p.slug !== slug);

    await writeProductsToFile(updated);

    return NextResponse.json({
      success: true,
      deletedCount: products.length - updated.length,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dbProducts = await prisma.product.findMany({
      include: {
        category: true,
        media: {
          orderBy: { displayOrder: "asc" },
        },
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, products: dbProducts });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
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

    // Delete matching products in PostgreSQL database
    const deleteResult = await prisma.product.deleteMany({
      where: {
        OR: [
          ...(id ? [{ id }] : []),
          ...(slug ? [{ slug }] : []),
        ],
      },
    });

    return NextResponse.json({
      success: true,
      deletedCount: deleteResult.count,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    // Even if db delete fails or item didn't exist in DB, return clean response
    return NextResponse.json({ success: false, error: "Failed to delete from DB" }, { status: 500 });
  }
}

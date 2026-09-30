import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Dhakaiya Dripz database...");

  // 1. Create Categories
  const pantsCat = await prisma.category.upsert({
    where: { slug: "pants" },
    update: {},
    create: {
      name: "Pants & Cargos",
      slug: "pants",
      description: "Tactical pleated twill trousers and parachute cargos.",
    },
  });

  const teesCat = await prisma.category.upsert({
    where: { slug: "oversized-tees" },
    update: {},
    create: {
      name: "Oversized Tees",
      slug: "oversized-tees",
      description: "260 GSM heavy combed drop-shoulder boxy tees.",
    },
  });

  // 2. Create Products
  const trouser = await prisma.product.upsert({
    where: { slug: "tactical-pleated-crease-trouser" },
    update: {},
    create: {
      title: "Tactical Pleated Crease Trouser",
      slug: "tactical-pleated-crease-trouser",
      description: "Heavyweight 320GSM cotton twill casual trouser with permanent center pleats.",
      basePrice: 2850,
      salePrice: 2450,
      gender: "UNISEX",
      fit: "RELAXED",
      isFeatured: true,
      isNewDrop: true,
      categoryId: pantsCat.id,
      media: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
            mediaType: "IMAGE",
            displayOrder: 0,
          },
          {
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            mediaType: "CATWALK_VIDEO",
            displayOrder: 1,
          },
        ],
      },
      variants: {
        create: [
          { size: "28", colorName: "Pitch Black", colorHex: "#111111", sku: "DD-TR-BLK-28", inventoryCount: 4 },
          { size: "30", colorName: "Pitch Black", colorHex: "#111111", sku: "DD-TR-BLK-30", inventoryCount: 6 },
          { size: "32", colorName: "Pitch Black", colorHex: "#111111", sku: "DD-TR-BLK-32", inventoryCount: 5 },
          { size: "34", colorName: "Pitch Black", colorHex: "#111111", sku: "DD-TR-BLK-34", inventoryCount: 3 },
        ],
      },
    },
  });

  console.log("Seeded sample product:", trouser.title);
  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

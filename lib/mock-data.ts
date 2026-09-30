export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  basePrice: number;
  salePrice?: number;
  gender: "UNISEX" | "MEN" | "WOMEN";
  category: "Pants" | "Shirts" | "Oversized Tees" | "Jackets & Hoodies" | "Accessories";
  fit: "OVERSIZED" | "RELAXED" | "REGULAR" | "TAILORED";
  isNewDrop: boolean;
  isFeatured: boolean;
  stockCount: number;
  catwalkVideoUrl?: string;
  images: string[];
  sizes: {
    size: string;
    stock: number;
  }[];
  colors: {
    name: string;
    hex: string;
  }[];
  details: string[];
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    title: "Tactical Pleated Crease Trouser",
    slug: "tactical-pleated-crease-trouser",
    tagline: "High-density tailored twill with razor-sharp front pinch pleats.",
    description: "Architectural silhouette casual trouser constructed from heavyweight 320GSM cotton twill. Features structured twin front pleats, hidden elasticated waistband tabs for custom fit adjustment, deep slash pockets, and clean rear welt pockets. Designed for seamless drape over chunky sneakers or boots.",
    basePrice: 2850,
    salePrice: 2450,
    gender: "UNISEX",
    category: "Pants",
    fit: "RELAXED",
    isNewDrop: true,
    isFeatured: true,
    stockCount: 14,
    catwalkVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: [
      { size: "28", stock: 2 },
      { size: "30", stock: 5 },
      { size: "32", stock: 4 },
      { size: "34", stock: 3 },
      { size: "36", stock: 0 }
    ],
    colors: [
      { name: "Pitch Black", hex: "#111111" },
      { name: "Wood Green", hex: "#2E3A2F" },
      { name: "Cement Grey", hex: "#7E827A" }
    ],
    details: [
      "Heavyweight 320GSM compact combed cotton twill",
      "Permanent pressed center pinch crease",
      "Extended tab button closure with YKK zip fly",
      "Concealed elastic side tabs for micro-adjustments",
      "Dry clean or cold machine wash inside out"
    ]
  },
  {
    id: "prod-2",
    title: "Dhakaiya Cyber Drip Oversized Boxy Tee",
    slug: "dhakaiya-cyber-drip-oversized-tee",
    tagline: "260 GSM drop-shoulder boxy silhouette with high-density puff print.",
    description: "Our signature silhouette crafted for Dhaka humid weather. Made of 100% pre-shrunk combed cotton that retains structure without feeling stifling. Ribbed 1.25-inch high neck collar that will never bacon-fold, drop shoulders, and custom metallic silicone badging at rear hem.",
    basePrice: 1650,
    salePrice: 1450,
    gender: "UNISEX",
    category: "Oversized Tees",
    fit: "OVERSIZED",
    isNewDrop: true,
    isFeatured: true,
    stockCount: 8,
    catwalkVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 1 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 0 }
    ],
    colors: [
      { name: "Obsidian Black", hex: "#0c0d0e" },
      { name: "Acid Lime Accent", hex: "#d4ff00" },
      { name: "Chalk Off-White", hex: "#f4f3ef" }
    ],
    details: [
      "260 GSM custom-milled heavyweight combed cotton",
      "Reinforced double-needle topstitching",
      "Tight non-sagging 1.25 inch ribbed neckband",
      "Micro-rubber high density logo badge on reverse",
      "Pre-washed to eliminate shrinkage"
    ]
  },
  {
    id: "prod-3",
    title: "Utility Multi-Pocket Parachute Cargo",
    slug: "utility-multi-pocket-parachute-cargo",
    tagline: "Ultra-light ripstop parachute pants with adjustable toggle bungees.",
    description: "Inspired by utilitarian combat wear and Y2K UK rave culture. Features 6 functional 3D cargo bellows pockets, articulated knee darts for freedom of movement, and adjustable ankle elastic bungee toggles so you can switch between a flared hem or a cuffed streetwear look in seconds.",
    basePrice: 3200,
    salePrice: 2850,
    gender: "UNISEX",
    category: "Pants",
    fit: "OVERSIZED",
    isNewDrop: true,
    isFeatured: true,
    stockCount: 19,
    catwalkVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: [
      { size: "28", stock: 3 },
      { size: "30", stock: 6 },
      { size: "32", stock: 5 },
      { size: "34", stock: 4 },
      { size: "36", stock: 1 }
    ],
    colors: [
      { name: "Battleship Grey", hex: "#4A4D4F" },
      { name: "Onyx Black", hex: "#141414" },
      { name: "Desert Khaki", hex: "#A89F91" }
    ],
    details: [
      "Matte technical nylon-cotton blend ripstop fabric",
      "6 3D flap cargo pockets with matte snap buttons",
      "Bungee drawstring cord lock at cuffs and waist",
      "Water-repellent coating for city drizzle",
      "Roomy drop crotch with articulated knee pleating"
    ]
  },
  {
    id: "prod-4",
    title: "Raw Edge Minimalist Cuban Collar Shirt",
    slug: "raw-edge-cuban-collar-shirt",
    tagline: "Textured linen-rayon blend relaxed vacation shirt with mother-of-pearl buttons.",
    description: "Breathable open-weave camp collar shirt tailored for warm Dhaka evenings. Cut with an effortless drape that drops naturally across shoulders. Clean French seam finishing and authentic polished shell buttons.",
    basePrice: 2200,
    salePrice: 1950,
    gender: "MEN",
    category: "Shirts",
    fit: "RELAXED",
    isNewDrop: false,
    isFeatured: true,
    stockCount: 12,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: [
      { size: "S", stock: 2 },
      { size: "M", stock: 4 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 1 }
    ],
    colors: [
      { name: "Ecru Linen", hex: "#E3DAC9" },
      { name: "Midnight Navy", hex: "#1C2833" }
    ],
    details: [
      "60% Linen, 40% Rayon for non-crease cooling drape",
      "Convertible open Cuban camp collar",
      "Straight hem with subtle side vents",
      "Natural shell resin buttons",
      "Cold water wash, hang dry"
    ]
  },
  {
    id: "prod-5",
    title: "Distressed Acid-Wash Heavyweight Hoodie",
    slug: "distressed-acid-wash-hoodie",
    tagline: "450 GSM French Terry with double-layered hood and micro-distressing.",
    description: "Heavy luxury fleece treated with a specialized mineral wash to achieve a lived-in patina. Features seamless kangaroo pocket, wide ribbed cuffs, double-layered hood without tacky metal eyelets, and raw-cut distressed details around hem and cuffs.",
    basePrice: 3800,
    salePrice: 3400,
    gender: "UNISEX",
    category: "Jackets & Hoodies",
    fit: "OVERSIZED",
    isNewDrop: true,
    isFeatured: true,
    stockCount: 6,
    catwalkVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: [
      { size: "S", stock: 1 },
      { size: "M", stock: 2 },
      { size: "L", stock: 2 },
      { size: "XL", stock: 1 }
    ],
    colors: [
      { name: "Mineral Charcoal", hex: "#2B2D2F" },
      { name: "Washed Sage", hex: "#7D8C7C" }
    ],
    details: [
      "450 GSM 100% Cotton loopback French Terry",
      "Hand-finished artisanal stone-wash finish",
      "Double layer deep hood for sculpted silhouette",
      "Drop shoulders with ribbed side gussets",
      "No drawstrings for a modern architectural clean look"
    ]
  },
  {
    id: "prod-6",
    title: "Modular Tactical Crossbody Chest Rig",
    slug: "modular-tactical-crossbody-bag",
    tagline: "Cordura 1000D water-repellent bag with FIDLOCK-style magnetic buckles.",
    description: "Engineered for urban commuters. Holds your phone, charger, wallet, keys, and fragrance bottle with dedicated organizers. Heavy-duty waterproof zippers and quick-release magnetic harness straps.",
    basePrice: 1850,
    salePrice: 1550,
    gender: "UNISEX",
    category: "Accessories",
    fit: "REGULAR",
    isNewDrop: false,
    isFeatured: false,
    stockCount: 15,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: [
      { size: "ONE SIZE", stock: 15 }
    ],
    colors: [
      { name: "Tactical Matte Black", hex: "#151515" },
      { name: "Olive Drab", hex: "#4B5320" }
    ],
    details: [
      "1000D Ballistic Cordura nylon weave",
      "Waterproof heat-sealed zipper seals",
      "Quick-release magnetic buckle locks",
      "Internal fleece-lined pocket for sunglasses/phone",
      "MOLLE webbing loops for attachments"
    ]
  }
];

export interface OrderItemRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryZone: "INSIDE_DHAKA" | "OUTSIDE_DHAKA";
  shippingAddress: string;
  deliveryCharge: number;
  subtotal: number;
  totalAmount: number;
  paymentMethod: "COD";
  orderStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  items: {
    title: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
}

export const INITIAL_ORDERS: OrderItemRecord[] = [
  {
    id: "ord-1",
    orderNumber: "DD-9482-101",
    customerName: "Tanvir Ahmed",
    customerPhone: "01712345678",
    customerEmail: "tanvir.ahmed@example.com",
    deliveryZone: "INSIDE_DHAKA",
    shippingAddress: "House 42, Road 11, Block D, Banani, Dhaka-1213",
    deliveryCharge: 80,
    subtotal: 2450,
    totalAmount: 2530,
    paymentMethod: "COD",
    orderStatus: "CONFIRMED",
    items: [
      {
        title: "Tactical Pleated Crease Trouser",
        size: "32",
        color: "Pitch Black",
        quantity: 1,
        price: 2450
      }
    ],
    createdAt: "2026-09-28T14:20:00.000Z"
  },
  {
    id: "ord-2",
    orderNumber: "DD-8371-204",
    customerName: "Sadia Rahman",
    customerPhone: "01898765432",
    customerEmail: "sadia.r@example.com",
    deliveryZone: "OUTSIDE_DHAKA",
    shippingAddress: "Flat 4B, Green View Tower, Nasirabad, Chattogram",
    deliveryCharge: 150,
    subtotal: 4300,
    totalAmount: 4450,
    paymentMethod: "COD",
    orderStatus: "PENDING",
    items: [
      {
        title: "Dhakaiya Cyber Drip Oversized Boxy Tee",
        size: "M",
        color: "Obsidian Black",
        quantity: 1,
        price: 1450
      },
      {
        title: "Utility Multi-Pocket Parachute Cargo",
        size: "30",
        color: "Battleship Grey",
        quantity: 1,
        price: 2850
      }
    ],
    createdAt: "2026-09-28T16:45:00.000Z"
  }
];

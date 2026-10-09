export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  productCode?: string;
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

export const INITIAL_PRODUCTS: ProductItem[] = [];

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

export const INITIAL_ORDERS: OrderItemRecord[] = [];


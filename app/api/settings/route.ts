import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "store_settings.json");

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
  youtube?: string;
  twitter?: string;
  messenger?: string;
}

export interface HeroBannerConfig {
  imageUrl: string;
  title: string;
  buttonText: string;
  linkUrl: string;
  textColor?: "dark" | "light";
  showOverlay?: boolean;
  imageFit?: "cover" | "contain" | "auto";
  imagePosition?: "top" | "center" | "bottom";
  bannerHeight?: "screen" | "large" | "medium" | "auto";
}

export interface StoreSettings {
  logoUrl: string | null;
  heroBanner?: HeroBannerConfig;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  freeShippingThreshold: number;
  socialLinks: SocialLinks;
  phone?: string;
  email?: string;
  address?: string;
  adminUsername?: string;
  adminPassword?: string;
  updatedAt?: string;
}

const DEFAULT_STORE_SETTINGS: StoreSettings = {
  logoUrl: "/uploads/dhakaiya-horizontal-black.png",
  heroBanner: {
    imageUrl: "/uploads/hero-banner-asos.png",
    title: "NEW-SEASON EDIT",
    buttonText: "SHOP NOW",
    linkUrl: "/shop",
    textColor: "dark",
    showOverlay: false,
  },
  deliveryInsideDhaka: 80,
  deliveryOutsideDhaka: 150,
  freeShippingThreshold: 3000,
  socialLinks: {
    facebook: "",
    instagram: "",
    tiktok: "",
    whatsapp: "",
    youtube: "",
    twitter: "",
  },
  phone: "+880 1799-445851",
  email: "support@dhakaiyadripz.com",
  address: "Gulshan 1 / Banani Hub, Dhaka, Bangladesh",
  adminUsername: "admin",
  adminPassword: "admin",
};

export async function GET() {
  try {
    const data = await readFile(SETTINGS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    const settings: StoreSettings = {
      ...DEFAULT_STORE_SETTINGS,
      ...parsed,
      heroBanner: {
        ...DEFAULT_STORE_SETTINGS.heroBanner!,
        ...(parsed.heroBanner || {}),
      },
      socialLinks: {
        ...DEFAULT_STORE_SETTINGS.socialLinks,
        ...(parsed.socialLinks || {}),
      },
    };
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ success: true, settings: DEFAULT_STORE_SETTINGS });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const dataDir = path.dirname(SETTINGS_FILE_PATH);
    await mkdir(dataDir, { recursive: true });

    let existingSettings: StoreSettings = { ...DEFAULT_STORE_SETTINGS };
    try {
      const data = await readFile(SETTINGS_FILE_PATH, "utf-8");
      existingSettings = { ...existingSettings, ...JSON.parse(data) };
    } catch {
      // File doesn't exist yet
    }

    const updatedSettings: StoreSettings = {
      ...existingSettings,
      ...(body.logoUrl !== undefined ? { logoUrl: body.logoUrl } : {}),
      ...(body.heroBanner !== undefined
        ? {
            heroBanner: {
              ...(existingSettings.heroBanner || DEFAULT_STORE_SETTINGS.heroBanner!),
              ...body.heroBanner,
            },
          }
        : {}),
      ...(body.deliveryInsideDhaka !== undefined
        ? { deliveryInsideDhaka: Number(body.deliveryInsideDhaka) }
        : {}),
      ...(body.deliveryOutsideDhaka !== undefined
        ? { deliveryOutsideDhaka: Number(body.deliveryOutsideDhaka) }
        : {}),
      ...(body.freeShippingThreshold !== undefined
        ? { freeShippingThreshold: Number(body.freeShippingThreshold) }
        : {}),
      socialLinks: {
        ...existingSettings.socialLinks,
        ...(body.socialLinks || {}),
      },
      ...(body.phone !== undefined ? { phone: body.phone } : {}),
      ...(body.email !== undefined ? { email: body.email } : {}),
      ...(body.address !== undefined ? { address: body.address } : {}),
      ...(body.adminUsername !== undefined ? { adminUsername: body.adminUsername } : {}),
      ...(body.adminPassword !== undefined ? { adminPassword: body.adminPassword } : {}),
      updatedAt: new Date().toISOString(),
    };

    await writeFile(SETTINGS_FILE_PATH, JSON.stringify(updatedSettings, null, 2), "utf-8");

    // Also backup to public/uploads
    try {
      const backupPath = path.join(process.cwd(), "public", "uploads", "store_settings.json");
      await writeFile(backupPath, JSON.stringify(updatedSettings, null, 2), "utf-8");
    } catch {}

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    console.error("Failed to save settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save store settings" },
      { status: 500 }
    );
  }
}

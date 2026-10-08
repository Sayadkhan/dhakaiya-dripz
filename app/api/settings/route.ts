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

export interface StoreSettings {
  logoUrl: string | null;
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
  logoUrl: "/uploads/drip-062eabdb-e093-4aef-8-1790770654393-4474.png",
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

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    console.error("Failed to save settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save store settings" },
      { status: 500 }
    );
  }
}

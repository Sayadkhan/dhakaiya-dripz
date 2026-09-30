import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const SETTINGS_FILE_PATH = path.join(process.cwd(), "data", "store_settings.json");

interface StoreSettings {
  logoUrl: string | null;
  updatedAt?: string;
}

export async function GET() {
  try {
    const data = await readFile(SETTINGS_FILE_PATH, "utf-8");
    const settings: StoreSettings = JSON.parse(data);
    return NextResponse.json({ success: true, settings });
  } catch {
    // If file doesn't exist yet, return null
    return NextResponse.json({ success: true, settings: { logoUrl: null } });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const logoUrl = body.logoUrl !== undefined ? body.logoUrl : null;

    const dataDir = path.dirname(SETTINGS_FILE_PATH);
    await mkdir(dataDir, { recursive: true });

    let existingSettings: StoreSettings = { logoUrl: null };
    try {
      const data = await readFile(SETTINGS_FILE_PATH, "utf-8");
      existingSettings = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    const updatedSettings: StoreSettings = {
      ...existingSettings,
      logoUrl,
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

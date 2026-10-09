import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".json": "application/json",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    if (!slug || slug.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Sanitize path to prevent directory traversal
    const safePath = path.normalize(path.join(...slug)).replace(/^(\.\.[\/\\])+/, "");

    const primaryDir = path.join(process.cwd(), "public", "uploads");
    const backupDir = path.join(process.cwd(), "data", "uploads");

    let targetFilePath = path.join(primaryDir, safePath);
    let fileExists = false;

    // Check primary location
    try {
      await stat(targetFilePath);
      fileExists = true;
    } catch {
      // Check backup location
      const backupPath = path.join(backupDir, safePath);
      try {
        await stat(backupPath);
        targetFilePath = backupPath;
        fileExists = true;
      } catch {
        fileExists = false;
      }
    }

    if (!fileExists) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const fileBuffer = await readFile(targetFilePath);
    const ext = path.extname(targetFilePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving uploaded file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

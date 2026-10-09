import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    // Accept both "files" and "file" form field keys
    const rawList = [...data.getAll("files"), ...data.getAll("file")];

    const files: File[] = rawList.filter(
      (item): item is File =>
        typeof item === "object" &&
        item !== null &&
        "arrayBuffer" in item &&
        typeof (item as File).name === "string" &&
        (item as File).size > 0
    );

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No valid files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const backupDir = path.join(process.cwd(), "data", "uploads");
    try {
      await mkdir(backupDir, { recursive: true });
    } catch {}

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Limit file size to 25MB
      if (file.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 25MB limit` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique sanitized filename
      const rawExt = path.extname(file.name || "").toLowerCase();
      const ext = rawExt || ".jpg";
      const baseClean = (file.name || "item")
        .replace(path.extname(file.name || ""), "")
        .toLowerCase()
        .replace(/[^\w-]/g, "")
        .slice(0, 20);
      const cleanName = baseClean || "photo";

      const uniqueFilename = `drip-${cleanName}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}${ext}`;
      const filePath = path.join(uploadDir, uniqueFilename);

      await writeFile(filePath, buffer);

      // Also persist to backup directory
      try {
        await writeFile(path.join(backupDir, uniqueFilename), buffer);
      } catch {}

      uploadedUrls.push(`/uploads/${uniqueFilename}`);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload file(s)" },
      { status: 500 }
    );
  }
}

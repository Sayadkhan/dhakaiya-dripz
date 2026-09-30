import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files: File[] = data.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique sanitized filename
      const ext = path.extname(file.name) || ".jpg";
      const cleanName = file.name
        .replace(ext, "")
        .toLowerCase()
        .replace(/[^\w-]/g, "")
        .slice(0, 20);
      const uniqueFilename = `drip-${cleanName}-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}${ext}`;
      const filePath = path.join(uploadDir, uniqueFilename);

      await writeFile(filePath, buffer);
      uploadedUrls.push(`/uploads/${uniqueFilename}`);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file(s)" },
      { status: 500 }
    );
  }
}

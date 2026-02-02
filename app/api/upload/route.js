import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    // 1️⃣ Auth check
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ Seller-only
    if (token.role !== "seller") {
      return NextResponse.json(
        { error: "Only sellers can upload images" },
        { status: 403 }
      );
    }

    // 3️⃣ Read form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // 4️⃣ Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5️⃣ Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // 6️⃣ Return image URL
    return NextResponse.json({
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    );
  }
}

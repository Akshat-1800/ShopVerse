import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    // 1️⃣ Auth check
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ DB connect
    await dbConnect();

    // 3️⃣ Extract product id
    const { id } = await params;

    // 4️⃣ Fetch product
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // 5️⃣ Return product
    return NextResponse.json(product);

  } catch (error) {
    console.error("Fetch product error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

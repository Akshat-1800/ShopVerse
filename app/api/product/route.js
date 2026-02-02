import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    // 1️⃣ Authenticate user
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2️⃣ Authorize seller
    if (token.role !== "seller") {
      return NextResponse.json(
        { error: "Only sellers can add products" },
        { status: 403 }
      );
    }

    // 3️⃣ Connect DB
    await dbConnect();

    // 4️⃣ Read request body
    const {
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    } = await req.json();

    // 5️⃣ Validate input
    if (
      !name ||
      !price ||
      !category ||
      !stock ||
      !imageUrl
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // 6️⃣ Create product
    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
      seller: token.sub, // 🔥 seller ID from JWT
    });

    // 7️⃣ Return success
    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );}}
export async function GET(request) {
  try {
    
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!["customer", "seller"].includes(token.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }
    await dbConnect();
    const { searchParams } = new URL(request.url)
    const search=searchParams.get("search") 
    const category=searchParams.get("category")
    let query = {};
    if(search){
      query.name = { $regex: search, $options: "i" };
    }
      if(category && category !== "All"){
      query.category = category;}
  
      const products = await Product.find(query).sort({ createdAt: -1 });
      return NextResponse.json({ products }, { status: 200 });
  }
   catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Orders from "@/models/Orders";

export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const orders = await Orders.find({ user: token.sub })
      .sort({ createdAt: -1 })
      .populate("items.product");

    return NextResponse.json({ orders }, { status: 200 });

  } catch (error) {
    console.error("Order history error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

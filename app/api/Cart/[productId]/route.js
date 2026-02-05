import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = params;

    await dbConnect();

    const cart = await Cart.findOne({ user: token.sub });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Delete cart item error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}

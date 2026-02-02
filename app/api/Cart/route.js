import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";

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

    let cart = await Cart.findOne({ user: token.sub })
      .populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: token.sub,
        items: [],
      });
    }

    return NextResponse.json(cart);

  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity = 1 } = await req.json();

    await dbConnect();

    let cart = await Cart.findOne({ user: token.sub });

    if (!cart) {
      cart = await Cart.create({
        user: token.sub,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
export async function PUT(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    await dbConnect();

    const cart = await Cart.findOne({ user: token.sub });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return NextResponse.json({ error: "Product not in cart" }, { status: 404 });
    }

    item.quantity = quantity;
    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Update cart error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

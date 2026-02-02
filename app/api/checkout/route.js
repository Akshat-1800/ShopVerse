import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import Orders from "@/models/Orders";

export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { address } = await req.json();

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: token.sub }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0
    );

    const order = await Orders.create({
      user: token.sub,
      items: orderItems,
      totalAmount,
      address,
    });

    // Clear cart after order creation
    cart.items = [];
    await cart.save();

    return NextResponse.json({
      message: "Order created",
      orderId: order._id,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}

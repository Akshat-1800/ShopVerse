import crypto from "crypto";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Orders from "@/models/Orders";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    await dbConnect();
    const order = await Orders.findById(orderId).populate("items.product");

    if (order.status === "PAID") {
      return NextResponse.json({ message: "Already paid" });
    }

    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    order.status = "PAID";
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}

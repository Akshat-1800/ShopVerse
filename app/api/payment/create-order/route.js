import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Orders from "@/models/Orders";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { orderId } = await req.json();
    await dbConnect();

    const order = await Orders.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return NextResponse.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}

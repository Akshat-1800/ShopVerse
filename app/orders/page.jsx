"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading orders...
      </div>
    );
  }

  /* ---------------- Filter Completed Orders ---------------- */
  const completedOrders = orders.filter(
    (order) => order.status !== "PENDING"
  );

  /* ---------------- No Completed Orders ---------------- */
  if (completedOrders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2">
          No completed orders yet
        </h2>
        <p className="text-gray-500 mb-4">
          Complete a purchase to see it here
        </p>
        <Link href="/cart" className="text-blue-600">
          Go to cart
        </Link>
      </div>
    );
  }

  /* ---------------- Orders History ---------------- */
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      <div className="space-y-6">
        {completedOrders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 bg-white"
          >
            {/* Header */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ₹{item.priceAtPurchase * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

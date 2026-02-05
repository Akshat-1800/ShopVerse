"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

const PaymentPage = () => {
  const { orderId } = useParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (processing) return;
    setProcessing(true);

    try {
      await loadRazorpay();

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        toast.error("Failed to initiate payment");
        router.push("/cart");
        return;
      }

      const data = await res.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.razorpayOrderId,
        name: "E-Commerce App",

        handler: async function (response) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyRes.ok) {
            toast.error("Payment verification failed");
            router.push("/cart");
            return;
          }

          toast.success("Payment successful!");
          router.push("/orders");
        },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            router.push("/cart");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        toast.error("Payment failed");
        router.push("/cart");
      });

      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong during payment");
      router.push("/cart");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
      <button
        onClick={handlePayment}
        disabled={processing}
        className="bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay with Razorpay"}
      </button>
    </div>
  );
};

export default PaymentPage;

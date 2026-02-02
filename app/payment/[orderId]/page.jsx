"use client";

import { useParams, useRouter } from "next/navigation";

const PaymentPage = () => {
  const { orderId } = useParams();
  const router = useRouter();

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    await loadRazorpay();

    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      order_id: data.razorpayOrderId,
      name: "E-Commerce App",

      handler: async function (response) {
        await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        router.push("/orders");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentPage;

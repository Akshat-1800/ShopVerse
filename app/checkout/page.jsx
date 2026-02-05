"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const router = useRouter();

  const [cart, setCart] = useState(null);
  const [savedDetails, setSavedDetails] = useState(null);
  const [useSavedDetails, setUseSavedDetails] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    fetch("/api/Cart")
      .then((res) => res.json())
      .then((data) => setCart(data));

    fetch("/api/auth/user-details")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setSavedDetails(data.user);
        setLoadingDetails(false);
      })
      .catch(() => setLoadingDetails(false));
  }, []);

  const handleUseSavedDetailsChange = (checked) => {
    setUseSavedDetails(checked);

    if (checked && savedDetails) {
      setName(savedDetails.name || "");
      setPhone(savedDetails.phone || "");
      setAddress(savedDetails.address || "");
    } else {
      setName("");
      setPhone("+91");
      setAddress("");
    }
  };

  const isPhoneValid = phone.startsWith("+91") && phone.length === 13;

  const handleCheckout = async () => {
    if (!isPhoneValid) {
      toast.error("Phone number must be +91 followed by 10 digits");
      return;
    }

    setLoading(true);

    const payload = useSavedDetails
      ? {
          name: savedDetails?.name,
          phone: savedDetails?.phone,
          address: savedDetails?.address,
        }
      : { name, phone, address };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Checkout failed");
      return;
    }

    router.push(`/payment/${data.orderId}`);
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading checkout...
      </div>
    );
  }

  const total =
    cart.items?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/cart" className="text-white">← Back to cart</Link>
          <h1 className="text-3xl font-bold mt-2">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border">
            {!loadingDetails && savedDetails && (
              <label className="flex gap-3 mb-6">
                <input
                  type="checkbox"
                  checked={useSavedDetails}
                  onChange={(e) =>
                    handleUseSavedDetailsChange(e.target.checked)
                  }
                />
                <span className="font-medium">
                  Use my saved details
                </span>
              </label>
            )}

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={useSavedDetails}
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            {/* Phone */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                // if (e.target.value.startsWith("+91")) {
                //   setPhone(e.target.value.slice(0, 13));
                // }
                setPhone(e.target.value);
              }}
              disabled={useSavedDetails}
              className="w-full mb-4 px-4 py-3 border rounded-xl"
            />

            {/* Address */}
            <textarea
              rows={4}
              placeholder="Delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={useSavedDetails}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-2xl border h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="flex justify-between mb-2">
            <span>Total</span>
            <span>₹{total}</span>
          </p>

          <button
            onClick={handleCheckout}
            disabled={
              loading ||
              (!useSavedDetails &&
                (!name.trim() || !address.trim() || !isPhoneValid))
            }
            className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

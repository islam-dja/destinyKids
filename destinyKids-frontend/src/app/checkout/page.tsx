"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { getWilayas, getCommunes } from "@/data/algeria-cities";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitCheckout } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const { getCart, clearCart } = useCart();
  const cart = getCart();
  const cartItems = Object.values(cart);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    wilaya: "",
    commune: "",
    address: "",
    postalCode: "",
    notes: "",
  });

  const [communes, setCommunes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wilayas = getWilayas();

  const handleWilayaChange = (wilaya: string) => {
    setFormData({ ...formData, wilaya, commune: "" });
    setCommunes(getCommunes(wilaya));
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    if (subtotal >= 10000) return 0; // Free shipping over 10000 DZD
    return 500; // Flat rate 500 DZD
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Map frontend camelCase to backend snake_case
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        wilaya: formData.wilaya,
        commune: formData.commune,
        address: formData.address,
        postal_code: formData.postalCode,
        notes: formData.notes,
      };

      await submitCheckout(payload);

      // Clear cart and redirect
      clearCart();
      alert(
        "Order placed successfully! You will receive a confirmation email shortly."
      );
      router.push("/");
    } catch (err: any) {
      console.error("Order submission failed:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fef7fb] px-6 py-28 pt-28">
        <span className="material-symbols-outlined text-[120px] text-purple-400 mb-5">
          shopping_cart
        </span>
        <h1 className="text-4xl text-[#3d1b4e] mb-3">Your cart is empty</h1>
        <p className="text-lg text-[#5e2f7b] mb-8">
          Add some items to your cart before checking out!
        </p>
        <a
          href="/shop"
          className="bg-purple-600 text-white px-8 py-4 rounded-[32px] text-base font-medium hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef7fb] py-28 px-6 md:px-28 pt-32">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-5xl text-[#3d1b4e] mb-12 text-center">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* BILLING & SHIPPING */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mb-8">
              <h2 className="text-3xl text-[#3d1b4e] mb-6">
                Billing & Shipping Information
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Wilaya *
                  </label>
                  <select
                    required
                    value={formData.wilaya}
                    onChange={(e) => handleWilayaChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="">Select Wilaya</option>
                    {wilayas.map((wilaya) => (
                      <option key={wilaya} value={wilaya}>
                        {wilaya}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Commune *
                  </label>
                  <select
                    required
                    value={formData.commune}
                    onChange={(e) =>
                      setFormData({ ...formData, commune: e.target.value })
                    }
                    disabled={!formData.wilaya}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">Select Commune</option>
                    {communes.map((commune) => (
                      <option key={commune} value={commune}>
                        {commune}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-lg text-[#5e2f7b] mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Street address, building, apartment"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-lg text-[#5e2f7b] mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg text-[#5e2f7b] mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={4}
                  placeholder="Special instructions for delivery"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sticky top-24">
              <h2 className="text-3xl text-[#3d1b4e] mb-6">Order Summary</h2>

              {/* CART ITEMS */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Image
                      src={item.image || "/images/placeholder.png"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-[#3d1b4e] font-medium">{item.name}</p>
                      <p className="text-sm text-[#5e2f7b]">Qty: {item.qty}</p>
                    </div>
                    <p className="text-purple-600 font-bold">
                      {item.price * item.qty} DZD
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTALS */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-lg">
                  <span className="text-[#5e2f7b]">Subtotal</span>
                  <span className="font-medium text-[#3d1b4e]">
                    {getSubtotal()} DZD
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-[#5e2f7b]">Shipping</span>
                  <span className="font-medium text-[#3d1b4e]">
                    {getShippingCost() === 0
                      ? "FREE"
                      : `${getShippingCost()} DZD`}
                  </span>
                </div>
                {getSubtotal() >= 10000 && (
                  <p className="text-sm text-green-600">
                    🎉 You qualify for free shipping!
                  </p>
                )}
              </div>

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span className="text-[#3d1b4e]">Total</span>
                <span className="text-purple-600">{getTotal()} DZD</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white px-8 py-4 rounded-[32px] text-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>

              <p className="text-sm text-center text-[#5e2f7b] mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

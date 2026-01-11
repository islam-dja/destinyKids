"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { getCart, removeFromCart, addToCart, clearCart } = useCart();
  const cart = getCart();
  const cartItems = Object.values(cart);

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    const foundItem = cart[id];
    if (foundItem) {
      addToCart({ ...foundItem, qty });
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fef7fb] px-5 py-20 pt-24">
        <span className="material-symbols-outlined text-[120px] text-purple-400 mb-5">
          shopping_cart
        </span>
        <h1 className="text-4xl text-[#3d1b4e] mb-3">Your cart is empty</h1>
        <p className="text-lg text-[#5e2f7b] mb-8">
          Add some items to your cart to see them here!
        </p>
        <Link
          href="/shop"
          className="bg-purple-600 text-white px-8 py-4 rounded-[32px] text-base font-medium hover:bg-purple-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef7fb] py-20 px-5 md:px-20 pt-30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl text-[#3d1b4e]">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            <span className="material-symbols-outlined">delete</span>
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[24px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex gap-6 items-center"
              >
                <Image
                  src={item.image || "/images/placeholder.png"}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="text-2xl text-[#3d1b4e] mb-2">{item.name}</h3>
                  <p className="text-purple-600 font-bold text-xl mb-3">
                    {item.price} DZD
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.qty - 1)}
                      className="w-9 h-9 rounded-full bg-[#f0e6f6] text-purple-600 font-bold text-lg hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-lg font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="w-9 h-9 rounded-full bg-[#f0e6f6] text-purple-600 font-bold text-lg hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <p className="text-2xl font-bold text-[#3d1b4e]">
                    {item.price * item.qty} DZD
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined">delete</span>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sticky top-24">
              <h2 className="text-3xl text-[#3d1b4e] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-lg">
                  <span className="text-[#5e2f7b]">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium text-[#3d1b4e]">
                    {getSubtotal()} DZD
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-[#5e2f7b]">Shipping</span>
                  <span className="font-medium text-[#3d1b4e]">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span className="text-[#3d1b4e]">Total</span>
                <span className="text-purple-600">{getSubtotal()} DZD</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-purple-600 text-white text-center px-8 py-4 rounded-[32px] text-lg font-medium hover:bg-purple-700 transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center text-purple-600 py-3 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

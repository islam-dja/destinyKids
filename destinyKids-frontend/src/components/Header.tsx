"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { getCartCount } = useCart();

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-80px)] max-w-[1400px] z-[1000]">
      <div className="flex items-center justify-between px-9 py-[18px] bg-purple-500/55 backdrop-blur-[22px] rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-white/[0.18]">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="pb-[3px] text-[26px] font-bold tracking-[1.5px] text-white">
            Destiny Kids
          </span>
          <span className="text-[11px] tracking-[1px] opacity-85 text-[#f6e8fb]">
            Made in Algeria
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-7 max-lg:hidden">
          <Link
            href="/"
            className="relative text-white no-underline text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/collections"
            className="relative text-white no-underline text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            Collections
          </Link>
          <Link
            href="/wholesale"
            className="relative text-white no-underline text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            Wholesale
          </Link>
          <Link
            href="/about"
            className="relative text-white no-underline text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative text-white no-underline text-[15px] font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-[18px]">
          <Link
            href="/shop"
            className="px-[22px] py-[10px] rounded-[22px] bg-white text-purple-600 no-underline text-sm font-semibold hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-all"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-white text-[22px] hover:-translate-y-[3px] hover:scale-[1.08] hover:text-[#ffd166] hover:drop-shadow-[0_6px_18px_rgba(255,209,102,0.24)] transition-all">
              shopping_cart
            </span>
            <span className="absolute -top-1 -right-1.5 text-[#ffd166] text-xs font-bold">
              {getCartCount()}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { fetchProducts } from "@/lib/api";
import { MOCK_BESTSELLERS } from "@/data/mockProducts";

export default function Home() {
  const { addToCart } = useCart();
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const collections = [
    {
      name: "Traditional Dolls",
      image: "/images/traditional-dolls.png",
      href: "/collections",
    },
    {
      name: "Home Dolls",
      image: "/images/home-dolls.png",
      href: "/collections",
    },
    {
      name: "Educational Toys",
      image: "/images/educational-toys.png",
      href: "/collections",
    },
    {
      name: "Cars & Vehicles",
      image: "/images/cars.png",
      href: "/collections",
    },
  ];

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetchProducts("limit=3"); // Assuming backend supports limit
        console.debug("fetchProducts resp:", resp);
        // Accept either an array response or an object with a `data` array
        if (Array.isArray(resp)) {
          setBestsellers(resp);
        } else if (Array.isArray(resp?.data)) {
          setBestsellers(resp.data);
        } else {
          setBestsellers([]);
        }
        console.debug(
          "bestsellers set:",
          Array.isArray(resp) ? resp.length : (resp?.data?.length ?? 0),
        );
      } catch (err) {
        console.error("Failed to fetch bestsellers:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({ ...product, qty: 1 });
  };

  return (
    <>
      {/* HERO */}
      <section
        className="min-h-screen bg-cover bg-[center_1%] bg-no-repeat flex items-center px-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(155, 89, 182, 0.7) 5%, rgba(232, 169, 193, 0.55) 30%, rgba(232, 169, 193, 0) 50%, rgba(232, 169, 193, 0) 90%), url('/images/hero-casbah-doll.png')",
        }}
      >
        <div className="max-w-[800px] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
          <h1 className="text-[72px] leading-[1.05] mb-[18px]">
            Algerian Dolls
            <br />
            With a Story
          </h1>
          <p className="text-[22px] leading-[1.5] mb-[22px] max-w-[680px]">
            Handmade dolls wearing authentic Algerian traditional clothing,
            crafted to celebrate heritage and childhood.
          </p>
          <div className="flex gap-3">
            <Link
              href="/shop"
              className="bg-white text-purple-600 px-8 py-4 rounded-[32px] text-base font-medium hover:shadow-lg transition-shadow"
            >
              Shop Collection
            </Link>
            <Link
              href="/wholesale"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-[32px] text-base font-medium hover:bg-white/10 transition-colors"
            >
              Wholesale
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-20 bg-[#fef7fb] text-center">
        <h2 className="text-5xl text-[#3d1b4e] mb-3">Our Collections</h2>
        <p className="text-xl mb-[50px] text-[#5e2f7b]">
          Discover our unique toys, inspired by Algerian tradition and modern
          play.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] px-[60px]">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="bg-white rounded-[24px] p-5 overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:rotate-[-1.5deg] hover:shadow-[0_18px_36px_rgba(0,0,0,0.15)] transition-all"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                width={300}
                height={300}
                className="w-full h-[300px] object-cover rounded-2xl mb-[15px]"
              />
              <h3 className="text-[22px] text-purple-600">{collection.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLER SECTION */}
      <section className="py-[100px] px-[60px] bg-gradient-to-b from-[#fef7fb] via-purple-600 to-white text-center text-[#fef7fb]">
        <div className="section-divider" />
        <h2 className="text-5xl text-white mb-3">Our Bestsellers</h2>
        <p className="text-xl mb-[50px] text-gray-800">
          These traditional dolls are loved by children and collectors alike.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-[50px]">
          {(bestsellers.length > 0 ? bestsellers : MOCK_BESTSELLERS).map(
            (product) => (
              <div
                key={product.id ?? product._id ?? product.slug ?? product.name}
                className="shine-effect bg-white rounded-[24px] p-5 shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(0,0,0,0.15)] transition-all overflow-hidden relative"
              >
                <span className="absolute top-3 left-[-10px] bg-[#e8a9c1] text-[#3d1b4e] text-sm font-semibold px-3 py-1.5 rotate-[-20deg] shadow-md rounded">
                  Best Seller
                </span>
                <img
                  src={product.image || "/images/placeholder.png"}
                  alt={product.name || "Product"}
                  loading="lazy"
                  className="w-full h-[550px] object-cover rounded-2xl mb-[15px]"
                />
                <h3 className="text-[22px] text-purple-600">{product.name}</h3>
                <p className="text-black font-bold my-2.5">
                  {product.price} DZD
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-purple-600 text-white px-7 py-3.5 rounded-[24px] text-lg hover:bg-purple-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ),
          )}
        </div>
        <div className="section-divider" />
      </section>

      {/* ABOUT PREVIEW */}
      <section className="relative py-[180px] px-20 bg-gradient-to-b from-white to-[#fef7fb] rounded-b-[90px] overflow-hidden">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between gap-20">
          <div className="flex-1">
            <h2 className="text-[46px] text-[#3d1b4e] mb-5">
              Inspired by Algerian Heritage
            </h2>
            <p className="text-xl leading-[1.7] text-[#5e2f7b] mb-[22px]">
              Destiny Kids creates dolls that carry the soul of Algerian
              culture. Each piece is carefully designed with traditional
              clothing, handcrafted details, and child-safe materials.
            </p>
            <p className="text-xl leading-[1.7] text-[#5e2f7b] mb-[22px]">
              Alongside our cultural dolls, we also offer educational toys and
              selected imported collections to support learning and joyful play.
            </p>
            <Link
              href="/about"
              className="inline-block mt-3 px-8 py-3.5 rounded-[30px] bg-purple-600 text-white font-medium hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(155,89,182,0.35)] transition-all"
            >
              Discover Our Story
            </Link>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-[420px] h-[420px] ml-auto">
              <Image
                src="/images/algerian-heritage.png"
                alt="Artisan crafting"
                width={300}
                height={300}
                className="absolute top-[-8px] right-[-8px] w-[300px] h-[300px] object-cover rounded-[22px] shadow-[0_18px_40px_rgba(0,0,0,0.12)] rotate-[-6deg] hover:scale-[1.04] hover:-translate-y-1.5 transition-all z-[2]"
              />
              <Image
                src="/images/algerian-girl.png"
                alt="Artisan crafting"
                width={300}
                height={300}
                className="absolute bottom-[-8px] left-[-8px] w-[300px] h-[300px] object-cover rounded-[22px] shadow-[0_18px_40px_rgba(0,0,0,0.12)] rotate-[6deg] hover:scale-[1.04] hover:-translate-y-1.5 transition-all z-[1]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative mx-auto my-[120px] max-w-[1200px] py-[100px] px-20 bg-gradient-to-br from-purple-600 to-[#e8a9c1] rounded-[80px] text-center text-white overflow-hidden shadow-[0_40px_80px_rgba(155,89,182,0.35)]">
        <div className="relative z-[2]">
          <h2 className="text-5xl mb-5">
            Bring Algerian Heritage Into Every Child&apos;s Hands
          </h2>
          <p className="text-[22px] leading-[1.6] max-w-[700px] mx-auto mb-10 opacity-95">
            From traditional dolls crafted with care to joyful modern toys,
            Destiny Kids connects culture, creativity, and childhood.
          </p>
          <div className="flex justify-center gap-5">
            <Link
              href="/shop"
              className="bg-white text-purple-600 px-9 py-4 rounded-[40px] text-[17px] font-medium hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all"
            >
              Shop the Collection
            </Link>
            <Link
              href="/wholesale"
              className="border-2 border-white bg-transparent text-white px-9 py-4 rounded-[40px] text-[17px] font-medium hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all"
            >
              Wholesale Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "kabyle-doll",
    name: "Kabyle Doll",
    price: 4200,
    image: "/images/kabyle-doll.png",
    category: "Traditional Dolls",
    inStock: true,
  },
  {
    id: "casbah-heritage",
    name: "Casbah Heritage Doll",
    price: 4800,
    image: "/images/casbah-heritage-doll.png",
    category: "Traditional Dolls",
    inStock: true,
  },
  {
    id: "bride-doll",
    name: "Traditional Bride Doll",
    price: 5500,
    image: "/images/traditional-bride-doll.png",
    category: "Traditional Dolls",
    inStock: true,
  },
  {
    id: "chaoui-doll",
    name: "Chaoui Doll",
    price: 4300,
    image: "/images/chaoui-doll.png",
    category: "Traditional Dolls",
    inStock: true,
  },
  {
    id: "mozabite-doll",
    name: "Mozabite Doll",
    price: 4600,
    image: "/images/mozabite-doll.png",
    category: "Traditional Dolls",
    inStock: true,
  },
  {
    id: "tlemcen-doll",
    name: "Tlemcen Dress Doll",
    price: 4900,
    image: "/images/tlemcen-doll.png",
    category: "Traditional Dolls",
    inStock: true,
  },
  {
    id: "home-doll-1",
    name: "Home Comfort Doll",
    price: 2800,
    image: "/images/home-doll-1.png",
    category: "Home Dolls",
    inStock: true,
  },
  {
    id: "home-doll-2",
    name: "Cozy Home Doll",
    price: 2900,
    image: "/images/home-doll-2.png",
    category: "Home Dolls",
    inStock: true,
  },
  {
    id: "educational-toy-1",
    name: "Learning Set",
    price: 3200,
    image: "/images/educational-toy-1.png",
    category: "Educational Toys",
    inStock: true,
  },
  {
    id: "car-1",
    name: "Mini Race Car",
    price: 1800,
    image: "/images/car-1.png",
    category: "Cars & Vehicles",
    inStock: true,
  },
];

const categories = [
  "All",
  "Traditional Dolls",
  "Home Dolls",
  "Educational Toys",
  "Cars & Vehicles",
];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 2000 DZD", min: 0, max: 2000 },
  { label: "2000 - 4000 DZD", min: 2000, max: 4000 },
  { label: "4000 - 6000 DZD", min: 4000, max: 6000 },
  { label: "Over 6000 DZD", min: 6000, max: Infinity },
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [fixedLeft, setFixedLeft] = useState<number | null>(null);
  const [fixedWidth, setFixedWidth] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setFixedLeft(rect.left + window.scrollX);
        setFixedWidth(rect.width);
      }
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= selectedPriceRange.min &&
      product.price <= selectedPriceRange.max;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fef7fb] py-20 px-5 md:px-20 pt-30">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-5xl text-[#3d1b4e] mb-3 text-center">
          Shop Our Collection
        </h1>
        <p className="text-xl text-[#5e2f7b] mb-12 text-center">
          Handmade dolls and quality toys for joyful childhood
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTERS SIDEBAR */}
          <div className="lg:col-span-1" ref={wrapperRef}>
            {/* placeholder to preserve layout on large screens */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] lg:invisible">
              <h2 className="text-2xl text-[#3d1b4e] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">filter_alt</span>
                Filters
              </h2>

              {/* SEARCH */}
              <div className="mb-8">
                <label className="block text-lg text-[#5e2f7b] mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                />
              </div>

              {/* CATEGORY FILTER */}
              <div className="mb-8">
                <h3 className="text-lg text-[#5e2f7b] mb-3 font-medium">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                        selectedCategory === category
                          ? "bg-purple-600 text-white"
                          : "bg-[#f0e6f6] text-[#5e2f7b] hover:bg-purple-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICE FILTER */}
              <div className="mb-8">
                <h3 className="text-lg text-[#5e2f7b] mb-3 font-medium">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(range)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                        selectedPriceRange.label === range.label
                          ? "bg-purple-600 text-white"
                          : "bg-[#f0e6f6] text-[#5e2f7b] hover:bg-purple-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* RESET FILTERS */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedPriceRange(priceRanges[0]);
                  setSearchQuery("");
                }}
                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>

            {/* fixed panel on large screens */}
            {fixedLeft !== null && fixedWidth !== null && (
              <div
                className="hidden lg:block fixed top-24 z-50"
                style={{ left: fixedLeft, width: fixedWidth }}
              >
                <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] overflow-auto max-h-[calc(100vh-6rem)]">
                  <h2 className="text-2xl text-[#3d1b4e] mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">
                      filter_alt
                    </span>
                    Filters
                  </h2>

                  {/* SEARCH */}
                  <div className="mb-8">
                    <label className="block text-lg text-[#5e2f7b] mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                    />
                  </div>

                  {/* CATEGORY FILTER */}
                  <div className="mb-8">
                    <h3 className="text-lg text-[#5e2f7b] mb-3 font-medium">
                      Category
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                            selectedCategory === category
                              ? "bg-purple-600 text-white"
                              : "bg-[#f0e6f6] text-[#5e2f7b] hover:bg-purple-100"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PRICE FILTER */}
                  <div className="mb-8">
                    <h3 className="text-lg text-[#5e2f7b] mb-3 font-medium">
                      Price Range
                    </h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.label}
                          onClick={() => setSelectedPriceRange(range)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                            selectedPriceRange.label === range.label
                              ? "bg-purple-600 text-white"
                              : "bg-[#f0e6f6] text-[#5e2f7b] hover:bg-purple-100"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* RESET FILTERS */}
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedPriceRange(priceRanges[0]);
                      setSearchQuery("");
                    }}
                    className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg text-[#5e2f7b]">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-[80px] text-purple-300 mb-4">
                  search_off
                </span>
                <p className="text-2xl text-[#5e2f7b]">
                  No products found matching your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="shine-effect bg-white rounded-[24px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all"
                  >
                    <Link href={`/product/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={350}
                        height={400}
                        className="w-full h-[400px] object-cover rounded-2xl mb-4"
                      />
                    </Link>

                    <div className="mb-2">
                      <span className="text-sm text-purple-600 font-medium">
                        {product.category}
                      </span>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-xl text-[#3d1b4e] mb-2 hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-purple-600 font-bold text-lg mb-4">
                      {product.price} DZD
                    </p>

                    <button
                      onClick={() => addToCart({ ...product, qty: 1 })}
                      className="w-full bg-purple-600 text-white px-6 py-3 rounded-[24px] text-base font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

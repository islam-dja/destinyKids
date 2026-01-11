"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock product database
const products: Record<string, any> = {
  "kabyle-doll": {
    id: "kabyle-doll",
    name: "Kabyle Doll",
    price: 4200,
    image: "/images/kabyle-doll.png",
    images: [
      "/images/kabyle-doll.png",
      "/images/kabyle-doll-2.png",
      "/images/kabyle-doll-3.png",
    ],
    category: "Traditional Dolls",
    inStock: true,
    description:
      "Handcrafted doll wearing the traditional Kabyle dress with intricate embroidery and jewelry. Made with safe, child-friendly materials and authentic Algerian fabric.",
    features: [
      "Authentic Kabyle traditional clothing",
      "Hand-embroidered details",
      "Safe, non-toxic materials",
      "Height: 35cm",
      "Suitable for ages 3+",
    ],
    materials: "Cotton fabric, polyester stuffing, embroidery thread",
    careInstructions: "Hand wash with cold water. Air dry. Do not bleach.",
  },
  "casbah-heritage": {
    id: "casbah-heritage",
    name: "Casbah Heritage Doll",
    price: 4800,
    image: "/images/casbah-heritage-doll.png",
    images: [
      "/images/casbah-heritage-doll.png",
      "/images/casbah-heritage-2.png",
    ],
    category: "Traditional Dolls",
    inStock: true,
    description:
      "Beautiful doll representing the historic Casbah of Algiers, dressed in traditional Algerian attire with elegant accessories.",
    features: [
      "Traditional Algiers Casbah style",
      "Handcrafted with care",
      "Premium quality materials",
      "Height: 38cm",
      "Collectible quality",
    ],
    materials: "Premium cotton, silk accents, polyester filling",
    careInstructions: "Spot clean only. Handle with care.",
  },
  "bride-doll": {
    id: "bride-doll",
    name: "Traditional Bride Doll",
    price: 5500,
    image: "/images/traditional-bride-doll.png",
    images: [
      "/images/traditional-bride-doll.png",
      "/images/bride-doll-2.png",
      "/images/bride-doll-3.png",
    ],
    category: "Traditional Dolls",
    inStock: true,
    description:
      "Exquisite doll dressed in traditional Algerian bridal attire with stunning details, jewelry, and accessories.",
    features: [
      "Traditional Algerian bridal dress",
      "Intricate beadwork and embroidery",
      "Gold-tone accessories",
      "Height: 40cm",
      "Premium collectible piece",
    ],
    materials:
      "Silk blend fabric, velvet accents, glass beads, metallic thread",
    careInstructions: "Display only. Dust gently with soft cloth.",
  },
};

const relatedProducts = [
  {
    id: "chaoui-doll",
    name: "Chaoui Doll",
    price: 4300,
    image: "/images/chaoui-doll.png",
  },
  {
    id: "mozabite-doll",
    name: "Mozabite Doll",
    price: 4600,
    image: "/images/mozabite-doll.png",
  },
  {
    id: "tlemcen-doll",
    name: "Tlemcen Dress Doll",
    price: 4900,
    image: "/images/tlemcen-doll.png",
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug];
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart({ ...product, qty: quantity });
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#fef7fb] py-20 px-5 md:px-20">
      <div className="max-w-[1600px] mx-auto">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-lg mb-8">
          <Link href="/" className="text-purple-600 hover:underline">
            Home
          </Link>
          <span className="text-[#5e2f7b]">/</span>
          <Link href="/shop" className="text-purple-600 hover:underline">
            Shop
          </Link>
          <span className="text-[#5e2f7b]">/</span>
          <span className="text-[#5e2f7b]">{product.name}</span>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* IMAGES */}
          <div>
            <div className="bg-white rounded-[32px] p-8 shadow-[0_12px_28px_rgba(0,0,0,0.08)] mb-5">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={700}
                className="w-full h-[600px] object-cover rounded-2xl"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-[100px] h-[100px] rounded-xl overflow-hidden border-4 transition-all ${
                      selectedImage === index
                        ? "border-purple-600"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <span className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>
            <h1 className="text-5xl text-[#3d1b4e] mb-4">{product.name}</h1>
            <p className="text-4xl text-purple-600 font-bold mb-6">
              {product.price} DZD
            </p>

            {product.inStock ? (
              <div className="flex items-center gap-2 text-green-600 mb-8">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="text-lg font-medium">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 mb-8">
                <span className="material-symbols-outlined">cancel</span>
                <span className="text-lg font-medium">Out of Stock</span>
              </div>
            )}

            <p className="text-xl text-[#5e2f7b] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* QUANTITY & ADD TO CART */}
            <div className="flex gap-5 mb-8">
              <div className="flex items-center gap-3 bg-white rounded-[24px] px-6 py-3 shadow-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-[#f0e6f6] text-purple-600 font-bold text-xl hover:bg-purple-600 hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center text-2xl font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-[#f0e6f6] text-purple-600 font-bold text-xl hover:bg-purple-600 hover:text-white transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-purple-600 text-white px-8 py-4 rounded-[32px] text-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </button>
            </div>

            {/* QUICK INFO */}
            <div className="bg-white rounded-[24px] p-6 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-600">
                  local_shipping
                </span>
                <span className="text-lg text-[#5e2f7b]">
                  Free shipping on orders over 10,000 DZD
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-600">
                  verified
                </span>
                <span className="text-lg text-[#5e2f7b]">
                  100% authentic Algerian craftsmanship
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-purple-600">
                  support_agent
                </span>
                <span className="text-lg text-[#5e2f7b]">
                  Customer support available 7 days/week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-[32px] p-10 shadow-[0_12px_28px_rgba(0,0,0,0.08)] mb-20">
          <div className="flex gap-5 mb-8 border-b border-gray-200">
            {["description", "features", "care"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xl font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-purple-600 border-b-4 border-purple-600"
                    : "text-[#5e2f7b] hover:text-purple-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-lg text-[#5e2f7b] leading-relaxed">
            {activeTab === "description" && (
              <div>
                <p className="mb-4">{product.description}</p>
                <p>
                  <strong>Materials:</strong> {product.materials}
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-purple-600 mt-1">
                      check_circle
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "care" && (
              <div>
                <p>{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div>
          <h2 className="text-4xl text-[#3d1b4e] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/product/${related.id}`}
                className="bg-white rounded-[24px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all"
              >
                <Image
                  src={related.image}
                  alt={related.name}
                  width={350}
                  height={400}
                  className="w-full h-[400px] object-cover rounded-2xl mb-4"
                />
                <h3 className="text-xl text-[#3d1b4e] mb-2">{related.name}</h3>
                <p className="text-purple-600 font-bold text-lg">
                  {related.price} DZD
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

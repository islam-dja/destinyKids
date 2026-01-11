import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: "traditional-dolls",
    name: "Traditional Dolls",
    description:
      "Handcrafted dolls wearing authentic Algerian traditional clothing from different regions",
    image: "/images/traditional-dolls.png",
    count: "12 Products",
  },
  {
    id: "home-dolls",
    name: "Home Dolls",
    description:
      "Cozy and comfortable dolls perfect for everyday play and companionship",
    image: "/images/home-dolls.png",
    count: "8 Products",
  },
  {
    id: "educational-toys",
    name: "Educational Toys",
    description:
      "Fun learning tools that inspire creativity, problem-solving, and cognitive development",
    image: "/images/educational-toys.png",
    count: "15 Products",
  },
  {
    id: "cars-vehicles",
    name: "Cars & Vehicles",
    description:
      "Action-packed toy cars, trucks, and vehicles for adventurous play",
    image: "/images/cars.png",
    count: "10 Products",
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef7fb] to-white pt-24">
      {/* HERO */}
      <section className="py-20 px-5 md:px-20 text-center">
        <h1 className="text-6xl text-[#3d1b4e] mb-5">Our Collections</h1>
        <p className="text-2xl text-[#5e2f7b] max-w-[800px] mx-auto leading-relaxed">
          Explore our curated collections of traditional dolls, educational
          toys, and playful treasures crafted with care.
        </p>
      </section>

      {/* COLLECTIONS GRID */}
      <section className="pb-20 px-5 md:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/shop?category=${encodeURIComponent(collection.name)}`}
              className="group relative h-[500px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-2"
            >
              {/* BACKGROUND IMAGE */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${collection.image}')`,
                }}
              />

              {/* OVERLAY GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,27,78,0.95)] via-[rgba(155,89,182,0.6)] to-transparent" />

              {/* CONTENT */}
              <div className="relative h-full flex flex-col justify-end p-10 text-white z-10">
                <span className="text-lg font-medium mb-2 opacity-90">
                  {collection.count}
                </span>
                <h2 className="text-4xl font-bold mb-4">{collection.name}</h2>
                <p className="text-lg leading-relaxed mb-6 opacity-95">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <span>Explore Collection</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-5 md:px-20 text-center bg-[#fef7fb]">
        <h2 className="text-4xl text-[#3d1b4e] mb-4">
          Can&apos;t Find What You&apos;re Looking For?
        </h2>
        <p className="text-xl text-[#5e2f7b] mb-8 max-w-[700px] mx-auto">
          Browse our full shop or contact us for custom orders and wholesale
          inquiries.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/shop"
            className="bg-purple-600 text-white px-8 py-4 rounded-[32px] text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            View All Products
          </Link>
          <Link
            href="/wholesale"
            className="bg-transparent text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-[32px] text-lg font-medium hover:bg-purple-600 hover:text-white transition-colors"
          >
            Wholesale Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}

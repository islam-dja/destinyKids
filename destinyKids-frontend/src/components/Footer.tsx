import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#2b0d2f] to-[#1b071f] text-white py-20 px-[6%] pb-[30px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[50px]">
        {/* BRAND */}
        <div className="lg:col-span-2">
          <h3 className="text-[28px] font-bold mb-[14px]">Destiny Kids</h3>
          <p className="text-[15px] leading-[1.7] opacity-85">
            Authentic Algerian dolls crafted with love, tradition, and safe
            materials for children.
          </p>
          <p className="mt-3 font-semibold">Made in Algeria 🇩🇿</p>
        </div>

        {/* SHOP */}
        <div>
          <h4 className="text-lg mb-4 relative">
            Shop
            <span className="block w-[30px] h-[3px] bg-[#e3a6d6] mt-1.5 rounded-[3px]"></span>
          </h4>
          <ul className="list-none p-0">
            <li className="mb-2.5">
              <Link
                href="/collections"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Traditional Dolls
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="/collections"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Home Dolls
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="/collections"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Educational Toys
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="/collections"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Imported Toys
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg mb-4 relative">
            Support
            <span className="block w-[30px] h-[3px] bg-[#e3a6d6] mt-1.5 rounded-[3px]"></span>
          </h4>
          <ul className="list-none p-0">
            <li className="mb-2.5">
              <Link
                href="#"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="#"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Returns Policy
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="/wholesale"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Wholesale
              </Link>
            </li>
            <li className="mb-2.5">
              <Link
                href="/contact"
                className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-lg mb-4 relative">
            Stay in Touch
            <span className="block w-[30px] h-[3px] bg-[#e3a6d6] mt-1.5 rounded-[3px]"></span>
          </h4>
          <p className="text-[15px] mb-4">
            Receive updates on new collections & offers.
          </p>
          <form className="flex gap-2.5">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-3 px-3.5 rounded-[30px] border-none outline-none text-black"
            />
            <button
              type="submit"
              className="bg-[#e3a6d6] text-[#2b0d2f] border-none py-3 px-[22px] rounded-[30px] cursor-pointer font-semibold hover:-translate-y-[2px] transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="mt-[60px] pt-5 border-t border-white/10 text-center text-sm opacity-70">
        <p>© 2026 Destiny Kids — All Rights Reserved</p>
      </div>
    </footer>
  );
}

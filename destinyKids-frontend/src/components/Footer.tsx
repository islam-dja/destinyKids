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

        {/* SHOP LOCATION */}
        <div>
          <h4 className="text-lg mb-4 relative">
            Our Shop
            <span className="block w-[30px] h-[3px] bg-[#e3a6d6] mt-1.5 rounded-[3px]"></span>
          </h4>
          <div className="mb-4">
            <div className="bg-white/10 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.5!2d3.0588!3d36.7525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb1b5c8b5c8b5%3A0x1234567890abcdef!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Destiny Kids Shop Location"
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-[14px] mt-3 opacity-75">
              📍 Algiers, Algeria
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="mt-[60px] pt-5 border-t border-white/10 text-center text-sm opacity-70">
        <p>© 2026 Destiny Kids — All Rights Reserved</p>
      </div>
    </footer>
  );
}

export const metadata = {
  title: "Contact — Destiny Kids",
  description:
    "Get in touch with Destiny Kids — wholesale, support, and custom orders.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-12">
      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10">
            <h1 className="text-4xl font-semibold mb-4">Get in touch</h1>
            <p className="text-lg text-slate-600 mb-6">
              We'd love to hear from you — questions about products, wholesale,
              or custom orders are welcome.
            </p>

            <address className="not-italic mb-4">
              <strong>Destiny Kids Workshop</strong>
              <div>Algiers, Algeria</div>
            </address>

            <p className="mb-2">
              <strong>Phone:</strong>{" "}
              <a
                className="text-purple-600 hover:underline"
                href="tel:0555663334"
              >
                0555663334
              </a>
            </p>

            <p className="mb-4">
              <strong>Email:</strong>{" "}
              <a
                className="text-purple-600 hover:underline"
                href="mailto:support@destinykids.com"
              >
                support@destinykids.com
              </a>
            </p>

            <p className="mb-6">
              <strong>Opening hours:</strong>
              <br />
              Mon–Fri 9:00 — 17:00
            </p>

            <div className="flex gap-3 mb-6">
              <a
                href="/shop"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full"
              >
                Shop
              </a>
              <a
                className="inline-block border border-purple-600 text-purple-600 px-6 py-3 rounded-full"
                href="https://wa.me/0555663334?text=Hello%20Destiny%20Kids"
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-3">
              <strong className="mr-2">Follow us:</strong>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/destiny.hamiz/#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center p-2 hover:bg-slate-50 rounded"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-slate-700"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5-.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </a>

              <a
                aria-label="TikTok"
                href="https://www.tiktok.com/@destiny.kids46"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center p-2 hover:bg-slate-50 rounded"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-slate-700"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path d="M12 3v6.2A4.8 4.8 0 1 0 14.8 14V7h3.2V3h-6z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="p-0">
            <div className="w-full h-[420px] md:h-full">
              <iframe
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12790.529394819354!2d3.2219119471232083!3d36.73139005301708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e5100567a0471%3A0x946f776972391d0b!2sDestiny%20kids!5e0!3m2!1sen!2sdz!4v1768336703802!5m2!1sen!2sdz"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Destiny Kids workshop map"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a
        className="fixed right-6 bottom-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        href="https://wa.me/0555663334?text=Hello%20Destiny%20Kids"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="material-symbols-outlined">whatsapp</span>
      </a>
    </main>
  );
}

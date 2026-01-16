export const metadata = {
  title: "About — Destiny Kids",
  description:
    "About Destiny Kids — handmade Algerian dolls, educational toys, and our mission.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-12">
      <section className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-10">
        <h1 className="text-4xl font-semibold mb-4">About Destiny Kids</h1>

        <p className="lead text-lg text-slate-700 mb-6">
          We craft toys that carry culture, curiosity, and care — connecting
          children to their heritage while inspiring playful learning every day.
          Destiny Kids creates dolls that carry the soul of Algerian culture.
          Each piece is carefully designed with traditional clothing,
          handcrafted details, and child-safe materials. Alongside our cultural
          dolls, we also offer educational toys and selected imported
          collections to support learning and joyful play.
        </p>

        <blockquote className="border-l-4 border-purple-300 pl-4 italic text-slate-600 mb-6">
          "Play shapes who we become — at Destiny Kids we make play meaningful."
        </blockquote>

        <ul className="grid gap-2 md:grid-cols-3 mb-6">
          <li>
            <strong>Handmade:</strong> Locally crafted with safe, child-friendly
            materials.
          </li>
          <li>
            <strong>Educational:</strong> Designs that spark imagination and
            early learning.
          </li>
          <li>
            <strong>Cultural:</strong> Inspired by Algerian heritage and
            stories.
          </li>
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-slate-600">Handmade Pieces</div>
          </div>
          <div>
            <div className="text-2xl font-bold">10+</div>
            <div className="text-sm text-slate-600">Local Artisans</div>
          </div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm text-slate-600">Safe Materials</div>
          </div>
        </div>

        <p className="mb-6">
          <a
            href="/shop"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full"
          >
            Shop Our Collection
          </a>
          <span className="ml-3 text-slate-700">or </span>
          <a className="text-purple-600 ml-1" href="/wholesale">
            become a wholesale partner
          </a>
        </p>

        <div className="w-full h-64 sm:h-80 rounded overflow-hidden">
          <iframe
            className="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12790.529394819354!2d3.2219119471232083!3d36.73139005301708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e5100567a0471%3A0x946f776972391d0b!2sDestiny%20kids!5e0!3m2!1sen!2sdz!4v1768336703802!5m2!1sen!2sdz"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Destiny Kids workshop map"
          />
        </div>
      </section>
    </main>
  );
}

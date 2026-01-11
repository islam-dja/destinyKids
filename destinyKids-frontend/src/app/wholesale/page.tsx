"use client";

import { useState } from "react";
import Image from "next/image";

const benefits = [
  {
    icon: "payments",
    title: "Competitive Prices",
    description:
      "Get wholesale prices on bulk orders with flexible payment terms",
  },
  {
    icon: "local_shipping",
    title: "Reliable Delivery",
    description: "Fast and secure shipping across Algeria with order tracking",
  },
  {
    icon: "verified",
    title: "Authentic Products",
    description: "All products are certified, safe, and meet quality standards",
  },
  {
    icon: "support_agent",
    title: "Dedicated Support",
    description: "Personal account manager to assist with your orders",
  },
];

const processSteps = [
  {
    number: 1,
    title: "Submit Inquiry",
    description: "Fill out the form with your business details",
  },
  {
    number: 2,
    title: "Review & Quote",
    description: "We review your request and send a custom quote",
  },
  {
    number: 3,
    title: "Agreement",
    description: "Sign the partnership agreement and place your first order",
  },
  {
    number: 4,
    title: "Delivery",
    description: "Receive your products with fast, secure shipping",
  },
];

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    location: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Thank you for your inquiry! Our wholesale team will contact you within 24 hours."
    );
    setFormData({
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      businessType: "",
      location: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef7fb] to-white">
      {/* HERO */}
      <section
        className="relative py-32 px-5 md:px-20 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(155, 89, 182, 0.9), rgba(232, 169, 193, 0.85)), url('/images/wholesale-hero.png')",
        }}
      >
        <div className="max-w-[900px] mx-auto text-white">
          <h1 className="text-6xl mb-5 leading-tight">
            Partner with Destiny Kids
          </h1>
          <p className="text-2xl leading-relaxed mb-8">
            Join our wholesale program and bring Algerian heritage dolls and
            quality toys to your customers
          </p>
          <a
            href="#form"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-[40px] text-lg font-medium hover:shadow-2xl transition-all"
          >
            Request Wholesale Info
          </a>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-5 md:px-20">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-5xl text-[#3d1b4e] text-center mb-4">
            Why Partner with Us?
          </h2>
          <p className="text-xl text-[#5e2f7b] text-center mb-16 max-w-[800px] mx-auto">
            We offer premium products, competitive pricing, and dedicated
            support for wholesale partners across Algeria.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className=" rounded-[24px] p-8 text-center shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(0,0,0,0.15)] transition-all relative overflow-hidden">
                {/* removed overlay element so background pattern is visible */}
                <span className="material-symbols-outlined text-[64px] text-purple-600 mb-4">
                  {benefit.icon}
                </span>
                <h3 className="text-2xl text-[#3d1b4e] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-lg text-[#5e2f7b] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-5 md:px-20 bg-[#fef7fb]">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-5xl text-[#3d1b4e] text-center mb-4">
            How It Works
          </h2>
          <p className="text-xl text-[#5e2f7b] text-center mb-16">
            Simple steps to become a Destiny Kids wholesale partner
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-[24px] p-8 text-center shadow-[0_8px_20px_rgba(0,0,0,0.08)] h-[320px] flex flex-col justify-center">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-5">
                    {step.number}
                  </div>
                  <h3 className="text-2xl text-[#3d1b4e] mb-3">{step.title}</h3>
                  <p className="text-lg text-[#5e2f7b] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="py-20 px-5 md:px-20">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-5xl text-[#3d1b4e] text-center mb-16">
            Our Wholesale Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="shine-effect relative h-[400px] rounded-[24px] overflow-hidden shadow-lg">
              <Image
                src="/images/traditional-dolls.png"
                alt="Traditional Dolls"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,27,78,0.9)] to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl mb-2">Traditional Dolls</h3>
                <p className="text-lg opacity-90">
                  Authentic Algerian heritage dolls
                </p>
              </div>
            </div>

            <div className="shine-effect relative h-[400px] rounded-[24px] overflow-hidden shadow-lg">
              <Image
                src="/images/educational-toys.png"
                alt="Educational Toys"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,27,78,0.9)] to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl mb-2">Educational Toys</h3>
                <p className="text-lg opacity-90">Learning through play</p>
              </div>
            </div>

            <div className="shine-effect relative h-[400px] rounded-[24px] overflow-hidden shadow-lg">
              <Image
                src="/images/home-dolls.png"
                alt="Home Dolls"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,27,78,0.9)] to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl mb-2">Home Dolls</h3>
                <p className="text-lg opacity-90">Comfort & companionship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="form" className="py-20 px-5 md:px-20 bg-[#fef7fb]">
        <div className="max-w-[900px] mx-auto">
          <div className="bg-white rounded-[32px] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <h2 className="text-5xl text-[#3d1b4e] text-center mb-4">
              Request Wholesale Information
            </h2>
            <p className="text-xl text-[#5e2f7b] text-center mb-10">
              Fill out the form below and our team will get back to you within
              24 hours
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Business Type *
                  </label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) =>
                      setFormData({ ...formData, businessType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="">Select Type</option>
                    <option value="Retail Store">Retail Store</option>
                    <option value="Online Store">Online Store</option>
                    <option value="Gift Shop">Gift Shop</option>
                    <option value="Toy Store">Toy Store</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg text-[#5e2f7b] mb-2">
                    Location (Wilaya) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Algiers"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg text-[#5e2f7b] mb-2">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  placeholder="Tell us about your business and what products you're interested in..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-600 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white px-8 py-4 rounded-[32px] text-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20 px-5 md:px-20 text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-4xl text-[#3d1b4e] mb-6">Have Questions?</h2>
          <p className="text-xl text-[#5e2f7b] mb-8">
            Our wholesale team is ready to answer all your questions and help
            you get started
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-purple-600">
                phone
              </span>
              <span className="text-lg text-[#5e2f7b]">+213 XXX XXX XXX</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-purple-600">
                mail
              </span>
              <span className="text-lg text-[#5e2f7b]">
                wholesale@destinykids.dz
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

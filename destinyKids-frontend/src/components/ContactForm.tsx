"use client";

import { useState, useEffect, useRef } from "react";
import { submitWholesaleInquiry } from "@/lib/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!success) return;
    successRef.current?.focus();
    const t = setTimeout(() => setSuccess(null), 5000);
    return () => clearTimeout(t);
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // client-side validation
    const valid = validate();
    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        company_name: formData.company || undefined,
        contact_person: formData.name,
        email: formData.email,
        phone: formData.phone,
        business_type: "Contact",
        message: formData.message,
      };

      await submitWholesaleInquiry(payload);

      setSuccess("Thanks — we'll get back to you shortly.");
      setFormData({ company: "", name: "", email: "", phone: "", message: "" });
      setFieldErrors({});
    } catch (err: any) {
      console.error("Contact submission failed:", err);
      setError(err?.message || "Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function validate() {
    const errors: Record<string, string> = {};
    if (!formData.name || !formData.name.trim())
      errors.name = "Name is required";
    if (!formData.email || !formData.email.trim())
      errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phone || !formData.phone.trim())
      errors.phone = "Phone is required";
    else if (formData.phone.replace(/\D/g, "").length < 6)
      errors.phone = "Phone looks too short";
    if (!formData.message || !formData.message.trim())
      errors.message = "Message is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div className="mt-6">
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 p-3 bg-red-100 text-red-700 rounded"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mb-4 p-3 bg-green-100 text-green-700 rounded"
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Company (optional)
          </label>
          <input
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full px-3 py-2 rounded border border-gray-200 focus:border-purple-600 focus:outline-none"
            placeholder="Your company name"
            type="text"
            aria-label="Company name"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Your name *
          </label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 rounded border border-gray-200 focus:border-purple-600 focus:outline-none"
            placeholder="Contact person"
            type="text"
            aria-invalid={fieldErrors.name ? "true" : "false"}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && (
            <div id="name-error" className="text-sm text-red-600 mt-1">
              {fieldErrors.name}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email *</label>
            <input
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 rounded border border-gray-200 focus:border-purple-600 focus:outline-none"
              type="email"
              placeholder="you@company.com"
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <div id="email-error" className="text-sm text-red-600 mt-1">
                {fieldErrors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Phone *</label>
            <input
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 rounded border border-gray-200 focus:border-purple-600 focus:outline-none"
              type="tel"
              placeholder="0555xxxxxx"
              aria-invalid={fieldErrors.phone ? "true" : "false"}
              aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            />
            {fieldErrors.phone && (
              <div id="phone-error" className="text-sm text-red-600 mt-1">
                {fieldErrors.phone}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">Message *</label>
          <textarea
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 rounded border border-gray-200 focus:border-purple-600 focus:outline-none resize-none"
            placeholder="How can we help?"
            aria-invalid={fieldErrors.message ? "true" : "false"}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message && (
            <div id="message-error" className="text-sm text-red-600 mt-1">
              {fieldErrors.message}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.message
            }
            className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400 flex items-center justify-center"
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}

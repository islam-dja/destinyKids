"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "../../contexts/AdminAuthProvider";

function LoginForm() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f0f6] flex items-center justify-center p-4 pt-28">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col leading-none">
            <span className="pb-[3px] text-[32px] font-bold tracking-[1.5px] text-[#3d1b4e]">
              Destiny Kids
            </span>
            <span className="text-[13px] tracking-[1px] opacity-75 text-[#9b59b6]">
              Made in Algeria
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-[20px] rounded-[24px] shadow-[0_20px_40px_rgba(155,89,182,0.15)] border border-white/[0.18] p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-[#3d1b4e] mb-2">
              Connexion Admin
            </h1>
            <p className="text-[#9b59b6] text-sm opacity-80">
              Accédez à votre panneau d'administration
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3d1b4e] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@destinykids.com"
                className="w-full px-4 py-3 bg-white/50 border border-[#e8a9c1]/30 rounded-xl text-[#3d1b4e] placeholder-[#9b59b6]/60 focus:outline-none focus:ring-2 focus:ring-[#9b59b6]/50 focus:border-[#9b59b6] transition-all duration-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3d1b4e] mb-2"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/50 border border-[#e8a9c1]/30 rounded-xl text-[#3d1b4e] placeholder-[#9b59b6]/60 focus:outline-none focus:ring-2 focus:ring-[#9b59b6]/50 focus:border-[#9b59b6] transition-all duration-200"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50/80 border border-red-200/50 rounded-xl p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] hover:from-[#8e44ad] hover:to-[#7d3c98] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[#9b59b6] hover:text-[#7d3c98] text-sm font-medium transition-colors duration-200"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-[#9b59b6]/60 text-sm">
            © 2026 Destiny Kids. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AdminAuthProvider>
      <LoginForm />
    </AdminAuthProvider>
  );
}

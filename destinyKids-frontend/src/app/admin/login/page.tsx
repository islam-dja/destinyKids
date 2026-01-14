"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../contexts/AdminAuthProvider";

export default function LoginPage() {
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
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">
        Connexion Admin — Destiny Kids
      </h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          type="password"
          className="p-2 border rounded"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button className="mt-2 p-2 bg-indigo-600 text-white rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}

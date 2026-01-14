"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "../../../contexts/AdminAuthProvider";

export default function Sidebar() {
  const { role, logout } = useAdminAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="brand">Destiny Kids — Admin</div>

      <nav className="mt-6 flex flex-col gap-2">
        <Link href="/admin" className={isActive("/admin") ? "active" : ""}>
          Tableau de bord
        </Link>
        <Link
          href="/admin/products"
          className={isActive("/admin/products") ? "active" : ""}
        >
          Produits
        </Link>
        <Link
          href="/admin/orders"
          className={isActive("/admin/orders") ? "active" : ""}
        >
          Commandes
        </Link>
        <Link
          href="/admin/wholesale"
          className={isActive("/admin/wholesale") ? "active" : ""}
        >
          Vente en gros
        </Link>
        {role === "admin" && (
          <Link
            href="/admin/users"
            className={isActive("/admin/users") ? "active" : ""}
          >
            Utilisateurs
          </Link>
        )}
      </nav>

      <div className="mt-6">
        <button onClick={() => logout()} className="logout-btn">
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}

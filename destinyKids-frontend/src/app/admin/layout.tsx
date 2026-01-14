"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";
import {
  AdminAuthProvider,
  useAdminAuth,
} from "../../contexts/AdminAuthProvider";
import Sidebar from "./components/Sidebar";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { token } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) return null; // Prevent rendering until redirect

  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}

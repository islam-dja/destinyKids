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
  const { token, initialized } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after we've loaded persisted auth from storage
    if (initialized && !token) {
      router.push("/login");
    }
  }, [initialized, token, router]);

  if (!initialized) return null; // Wait for auth to initialize

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

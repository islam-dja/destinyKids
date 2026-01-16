"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { adminLogin, API_BASE } from "../lib/api";

type AuthState = {
  token: string | null;
  role: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialized?: boolean;
};

const AdminAuthContext = createContext<AuthState | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  // Load persisted auth from localStorage on client mount to avoid
  // hydration mismatches (server renders null, client should initially also be null).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken = localStorage.getItem("destiny_admin_token");
    const storedRole = localStorage.getItem("destiny_admin_role");
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    setInitialized(true);
  }, []);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("destiny_admin_token", token);
    } else {
      localStorage.removeItem("destiny_admin_token");
    }
  }, [token]);

  useEffect(() => {
    if (role) localStorage.setItem("destiny_admin_role", role);
    else localStorage.removeItem("destiny_admin_role");
  }, [role]);

  useEffect(() => {
    if (token) {
      // Validate token by calling /user
      fetch(`${API_BASE}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            const err: any = new Error("Token validation failed");
            err.status = res.status;
            throw err;
          }
          return res.json();
        })
        .then((user) => {
          setUser(user);
        })
        .catch((err: any) => {
          // Only clear token automatically on 401 Unauthorized.
          if (err?.status === 401) {
            console.debug("AdminAuth: token invalid (401), clearing auth");
            setToken(null);
            setRole(null);
            setUser(null);
            localStorage.removeItem("destiny_admin_token");
            localStorage.removeItem("destiny_admin_role");
          } else {
            console.warn("AdminAuth: token validation error", err);
          }
        });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const resp: any = await adminLogin(email, password);
    // Expect backend to return token and user/role
    const bearer = resp?.token || resp?.access_token || resp?.data?.token;
    const userObj = resp?.user || resp?.data?.user || null;
    const userRole =
      userObj?.role ||
      (userObj?.roles ? userObj.roles[0] : null) ||
      resp?.role ||
      null;

    // Persist immediately so other provider instances see the token
    if (typeof window !== "undefined") {
      if (bearer) localStorage.setItem("destiny_admin_token", bearer);
      if (userRole) localStorage.setItem("destiny_admin_role", userRole);
    }

    setToken(bearer || null);
    setUser(userObj);
    setRole(userRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem("destiny_admin_token");
    localStorage.removeItem("destiny_admin_role");
  };

  return (
    <AdminAuthContext.Provider
      value={{ token, role, user, login, logout, initialized }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

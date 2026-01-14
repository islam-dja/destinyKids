"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { adminLogin, API_BASE } from "../lib/api";

type AuthState = {
  token: string | null;
  role: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AuthState | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("destiny_admin_token")
      : null
  );
  const [role, setRole] = useState<string | null>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("destiny_admin_role")
      : null
  );
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
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((user) => setUser(user))
        .catch(() => {
          // Invalid token, clear it
          setToken(null);
          setRole(null);
          setUser(null);
          localStorage.removeItem("destiny_admin_token");
          localStorage.removeItem("destiny_admin_role");
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
    <AdminAuthContext.Provider value={{ token, role, user, login, logout }}>
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

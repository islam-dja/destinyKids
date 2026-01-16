export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api/v1";

async function request(path: string, opts: RequestInit = {}) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("destiny_admin_token")
      : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...((opts.headers as Record<string, string>) || {}),
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Let callers handle 401 (do not perform global redirect here).
      const err401: any = new Error("Unauthorized");
      err401.status = 401;
      throw err401;
    }
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { message: text };
    }
    const err: any = new Error(json.message || res.statusText);
    err.status = res.status;
    err.body = json;
    throw err;
  }

  return res.json();
}

export async function adminLogin(email: string, password: string) {
  return request(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchProducts(params = "") {
  return request(`/products${params ? `?${params}` : ""}`);
}

export async function fetchOrders() {
  return request(`/orders`);
}

export async function fetchWholesaleStats() {
  return request(`/admin/wholesale/stats`);
}

export async function fetchWholesaleInquiries(query = "") {
  return request(`/admin/wholesale/inquiries${query ? `?${query}` : ""}`);
}

export async function submitCheckout(data: any) {
  return request(`/checkout`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitWholesaleInquiry(data: any) {
  return request(`/wholesale/inquiry`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

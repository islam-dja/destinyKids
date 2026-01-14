"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetchProducts("per_page=100");
        setProducts(Array.isArray(resp?.data) ? resp.data : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="admin-products">
      <div className="flex justify-between items-center mb-6">
        <h1>Gestion des Produits</h1>
        <button className="btn-primary">Ajouter un produit</button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <div className="spinner mx-auto mb-2"></div>
                  Chargement...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">
                  Aucun produit trouvé.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded overflow-hidden">
                        {p.main_image && (
                          <img
                            src={p.main_image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-400">
                    {p.category?.name || "N/A"}
                  </td>
                  <td className="font-mono">{p.price} DZD</td>
                  <td>
                    <span
                      className={`status-badge ${
                        p.stock_status === "in_stock" ? "approved" : "rejected"
                      }`}
                    >
                      {p.stock_status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary mr-2">Éditer</button>
                    <button className="btn-danger">Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

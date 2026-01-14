"use client";
import React, { useEffect, useState } from "react";
import { fetchWholesaleInquiries } from "@/lib/api";

export default function AdminWholesalePage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetchWholesaleInquiries();
        setInquiries(Array.isArray(resp?.data) ? resp.data : []);
      } catch (err) {
        console.error("Failed to fetch inquiries:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="admin-wholesale">
      <h1 className="text-2xl font-bold mb-6">Demandes Vente en Gros</h1>

      <div className="bg-[#1a2233] rounded-xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Entreprise</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Statut</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Chargement...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  Aucune demande trouvée.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{inq.company_name}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{inq.contact_person}</div>
                    <div className="text-xs text-slate-500">{inq.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400 uppercase`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-purple-400 hover:text-purple-300">
                      Voir
                    </button>
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

"use client";
import React, { useEffect, useState } from "react";
import KpiCard from "./components/KpiCard";
import SalesMap from "./components/SalesMap";
import CsvExportButton from "./components/CsvExportButton";
import { fetchWholesaleStats, fetchOrders } from "../../lib/api";

export default function AdminPage() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [sales, setSales] = useState(0);
  const [benefits, setBenefits] = useState(0);
  const [chiffre, setChiffre] = useState(0);
  const [mapData, setMapData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const ordersResp: any = await fetchOrders().catch(() => null);
        const statsResp: any = await fetchWholesaleStats().catch(() => null);

        // Map inquiry stats to KPIs
        setOrdersCount(statsResp?.data?.total_inquiries || 0);
        setSales(statsResp?.data?.recent_7_days || 0); // Using "Recent (7d)" instead of Sales
        setBenefits(statsResp?.data?.status_counts?.pending || 0); // Using "Pending" instead of Benefits
        setChiffre(statsResp?.data?.status_counts?.reviewed || 0); // Using "Reviewed" instead of CA

        // Map status counts to "Analysis" if possible, or keep placeholder
        setMapData(
          statsResp?.data?.status_counts || {
            Pending: 0,
            Reviewed: 0,
            Contacted: 0,
          }
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>

      <div className="kpi-grid">
        <KpiCard title="Total Inquiries" value={loading ? "..." : ordersCount} />
        <KpiCard title="Recent (7d)" value={loading ? "..." : sales} />
        <KpiCard
          title="Pending"
          value={loading ? "..." : benefits}
        />
        <KpiCard
          title="Reviewed"
          value={loading ? "..." : chiffre}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Analyse géographique</h2>
        <CsvExportButton
          data={Object.entries(mapData).map(([city, val]) => ({ city, val }))}
          filename="sales_by_city.csv"
        />
      </div>

      <SalesMap data={mapData} />
    </div>
  );
}

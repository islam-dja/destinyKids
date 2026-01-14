"use client";
import React from "react";

// Simple city-based sales visualization for Algeria.
export default function SalesMap({ data }: { data: Record<string, number> }) {
  const max = Math.max(...Object.values(data), 1);

  function intensity(val: number) {
    const t = Math.round((val / max) * 255);
    // gradient from light mint to purple
    return `rgb(${120 + Math.round((t / 255) * 60)}, ${
      200 - Math.round((t / 255) * 80)
    }, ${180 + Math.round((t / 255) * 80)})`;
  }

  return (
    <div className="sales-map">
      <h3>Ventes par ville</h3>
      <div className="flex flex-wrap">
        {Object.entries(data).map(([city, value]) => (
          <div
            key={city}
            className="city-dot"
            style={{ background: intensity(value) }}
          >
            <div className="city-name">{city}</div>
            <div className="city-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

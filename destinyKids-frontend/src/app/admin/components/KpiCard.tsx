"use client";
import React from "react";

export default function KpiCard({
  title,
  value,
  delta,
}: {
  title: string;
  value: string | number;
  delta?: string;
}) {
  return (
    <div className="kpi-card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      {delta && <div className="delta">{delta}</div>}
    </div>
  );
}

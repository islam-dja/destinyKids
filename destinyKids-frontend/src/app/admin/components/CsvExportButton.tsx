"use client";
import React from "react";

function toCSV(rows: any[]) {
  if (!rows || rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(",")];
  for (const r of rows)
    lines.push(keys.map((k) => JSON.stringify(r[k] ?? "")).join(","));
  return lines.join("\n");
}

export default function CsvExportButton({
  data,
  filename = "export.csv",
}: {
  data: any[];
  filename?: string;
}) {
  const onClick = () => {
    const csv = toCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={onClick} className="export-btn">
      Exporter CSV
    </button>
  );
}

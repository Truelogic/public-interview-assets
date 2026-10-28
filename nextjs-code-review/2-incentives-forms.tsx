"use client";

import { useEffect, useState } from "react";

import type { Row, Version, Year } from "@/lib/offers";

const YEARS: Year[] = ["yr1", "yr2", "yr3"];

interface Props {
  offerId: string;
  initial: Version;
  save: (offerId: string, rows: Row[], customRows: Row[]) => Promise<void>;
}

export function IncentivesForm({ offerId, initial, save }: Props) {
  const [rows, setRows] = useState(initial.rows);
  const [projection, setProjection] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.pricing-partner.example/projection?offer=${offerId}`, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRICING_API_KEY}` },
    })
      .then((res) => res.json())
      .then((data) => setProjection(data.y1Commission))
      .catch(() => setProjection(null));
  }, [offerId]);

  const update = (key: string, year: Year, value: string) =>
    setRows(rows.map((r) => (r.key === key ? { ...r, [year]: value } : r)));

  const total = (year: Year) => rows.reduce((sum, r) => sum + (parseFloat(r[year]) || 0), 0);

  return (
    <form action={() => save(offerId, rows, initial.customRows)} className="space-y-4">
      <p className="text-sm">Projected Year 1 commission: {projection ?? "—"}</p>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Incentive</th>
            <th>Year 1</th>
            <th>Year 2</th>
            <th>Year 3</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>{row.label}</td>
              {YEARS.map((year) => (
                <td key={year}>
                  <input
                    aria-label={`${row.label} ${year}`}
                    value={row[year]}
                    onChange={(e) => update(row.key, year, e.target.value)}
                    className="w-28 rounded border px-2 py-1"
                  />
                </td>
              ))}
            </tr>
          ))}
          {initial.customRows.map((row) => (
            <tr key={row.key}>
              <td>{row.label}</td>
              {YEARS.map((year) => (
                <td key={year}>{row[year]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td>Total</td>
            {YEARS.map((year) => (
              <td key={year}>${total(year).toFixed(2)}</td>
            ))}
          </tr>
        </tfoot>
      </table>
      <button className="rounded bg-black px-4 py-2 text-white">Save</button>
    </form>
  );
}

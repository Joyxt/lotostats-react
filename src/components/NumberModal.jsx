import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function NumberModal({ number, isChance = false, draws = [], onClose }) {
  const [mode, setMode] = useState("year"); // "year" ou "month"

  if (!draws || !draws.length) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Évolution du numéro {number}</h3>
            <button onClick={onClose} className="text-gray-600">✖</button>
          </div>
          <p className="text-sm text-gray-600">Aucune donnée disponible.</p>
        </div>
      </div>
    );
  }

  const stats = {};
  draws.forEach((d) => {
    const date = d.date ? new Date(d.date) : null;
    if (!date) return;
    const key = mode === "year" ? String(date.getFullYear()) : `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;
    const found = isChance ? d.chance === number : (Array.isArray(d.numbers) && d.numbers.includes(number));
    if (!stats[key]) stats[key] = 0;
    if (found) stats[key] += 1;
  });

  const data = Object.keys(stats).sort().map(k => ({ period: k, count: stats[k] }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 w-11/12 max-w-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{isChance ? "🍀 Numéro chance " : "Évolution du numéro "} {number}</h3>
          <button onClick={onClose} className="text-gray-600">✖</button>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <button className={`px-3 py-1 rounded ${mode==="year" ? "bg-indigo-600 text-white" : "bg-gray-200"}`} onClick={() => setMode("year")}>Année</button>
          <button className={`px-3 py-1 rounded ${mode==="month" ? "bg-indigo-600 text-white" : "bg-gray-200"}`} onClick={() => setMode("month")}>Mois</button>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

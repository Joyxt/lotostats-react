// src/components/NumberModal.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function NumberModal({ isOpen, onClose, number, isChance, draws }) {
  const [mode, setMode] = useState("year"); // "year" ou "month"

  // Récupérer la timeline du numéro choisi
  const timeline = useMemo(() => {
    if (!number || !draws) return {};

    // Cherche dans le bon tableau
    const source = isChance ? draws.mostFrequentChances : draws.mostFrequent;
    const found = source.find((item) => item.num === number);
    return found ? found.timeline : {};
  }, [number, isChance, draws]);

  // Transformer timeline en dataset pour Recharts
  const chartData = useMemo(() => {
    if (!timeline) return [];

    return Object.entries(timeline)
      .map(([ym, count]) => {
        const [year, month] = ym.split("-");
        return {
          year,
          month,
          label: mode === "year" ? year : `${year}-${month}`,
          count,
        };
      })
      .reduce((acc, cur) => {
        // Si mode=year, regrouper par année
        if (mode === "year") {
          const existing = acc.find((x) => x.label === cur.year);
          if (existing) existing.count += cur.count;
          else acc.push({ label: cur.year, count: cur.count });
        } else {
          acc.push({ label: cur.label, count: cur.count });
        }
        return acc;
      }, [])
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [timeline, mode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Titre */}
            <h2 className="text-xl font-bold text-center mb-4">
              📈 Statistiques pour le numéro {number}{" "}
              {isChance && <span className="text-orange-500">(Numéro Chance)</span>}
            </h2>

            {/* Boutons de bascule */}
            <div className="flex justify-center space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  mode === "year" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setMode("year")}
              >
                Par année
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  mode === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setMode("month")}
              >
                Par mois
              </button>
            </div>

            {/* Graphique */}
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={isChance ? "#f97316" : "#2563eb"}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bouton fermer */}
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={onClose}
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

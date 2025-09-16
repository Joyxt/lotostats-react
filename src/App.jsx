// src/App.jsx
import React, { useEffect, useState } from "react";
import StatsWrapper from "./components/StatsSection";
import RandomSuggestion from "./components/RandomSuggestion";
import NumberModal from "./components/NumberModal";
import { fetchLotoData } from "./services/lotoApi";
import "./index.css";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedIsChance, setSelectedIsChance] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await fetchLotoData();
        setData(result);
      } catch (err) {
        console.error("Erreur chargement loto.json :", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Safety: si pas de data encore, on affiche loader / message
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a286f7] to-[#86aff7]">
        <p className="text-lg font-semibold">⏳ Chargement des données...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a286f7] to-[#86aff7]">
        <p className="text-lg font-semibold text-red-600">❌ Impossible de charger les données.</p>
      </div>
    );
  }

  // Préparer les listes
  const allBalls = data.mostFrequent || []; // tableau complet trié desc {num,count,timeline}
  const top5 = allBalls.slice(0, 5);
  const chanceList = data.mostFrequentChances || []; // trié desc
  const chanceMost = chanceList.length ? chanceList[0] : null; // top chance
  const chanceLeast = chanceList.length ? chanceList[chanceList.length - 1] : null; // chance la moins sortie

  // Construire arrays affichés (5 boules + boule chance à la fin)
  const top5WithChance = [...top5];
  if (chanceMost) top5WithChance.push({ ...chanceMost, isChance: true });

  const rare5 = data.rarest || [];
  const rare5WithChance = [...rare5];
  if (chanceLeast) rare5WithChance.push({ ...chanceLeast, isChance: true });

  const handleNumberClick = (num, isChance = false) => {
    setSelectedNumber(num);
    setSelectedIsChance(!!isChance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400 p-6">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mt-6">
        <div className="flex items-center justify-center gap-3">
          <span style={{ fontSize: 28 }}>📈</span>
          <h1 className="text-3xl font-extrabold">LotoStats</h1>
        </div>
      </header>

      {/* Main */}
      <main className="w-full max-w-4xl mt-8 mb-8">
        <StatsWrapper
          mostFrequent={top5WithChance}
          rarest={rare5WithChance}
          onNumberClick={handleNumberClick}
        />

        <div className="mt-8">
          <RandomSuggestion
            top10Numbers={allBalls.slice(0, 10).map((n) => n.num)}
            top5Chances={chanceList.slice(0, 5).map((c) => c.num)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mb-8 text-sm text-gray-700">Made with ❤️ by Skalito</footer>

      {/* Modal */}
      <NumberModal
        isOpen={selectedNumber !== null}
        onClose={() => setSelectedNumber(null)}
        number={selectedNumber}
        isChance={selectedIsChance}
        draws={data}
      />
    </div>
  );
}

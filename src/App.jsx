import React, { useEffect, useState } from "react";
import StatsWrapper from "./components/StatsWrapper";
import NumberModal from "./components/NumberModal";
import { getDraws } from "./services/lotoApi";

export default function App() {
  const [draws, setDraws] = useState([]);
  const [topNumbers, setTopNumbers] = useState([]);
  const [rareNumbers, setRareNumbers] = useState([]);
  const [lastLucky, setLastLucky] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getDraws();
        // data doit être un tableau de {date, numbers: [], chance}
        setDraws(Array.isArray(data) ? data : []);
        computeRanks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur dans load():", err);
        setDraws([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function computeRanks(data) {
    const counts = {};
    const chanceCounts = {};

    data.forEach((d) => {
      if (!d || !Array.isArray(d.numbers)) return;
      d.numbers.forEach((n) => {
        if (typeof n === "number" && !Number.isNaN(n)) counts[n] = (counts[n] || 0) + 1;
      });
      if (d.chance != null) {
        const c = Number(d.chance);
        if (!Number.isNaN(c)) chanceCounts[c] = (chanceCounts[c] || 0) + 1;
      }
    });

    // transformer en tableau trié
    const sorted = Object.entries(counts)
      .map(([num, count]) => ({ num: Number(num), count }))
      .sort((a, b) => b.count - a.count);

    const sortedChance = Object.entries(chanceCounts)
      .map(([num, count]) => ({ num: Number(num), count }))
      .sort((a, b) => b.count - a.count);

    // top 5 + chance most frequent (if exist)
    const top5 = sorted.slice(0, 5).map((x) => ({ ...x, isChance: false }));
    if (sortedChance.length > 0) top5.push({ ...sortedChance[0], isChance: true });

    // rarest 5 (lowest counts) + chance least frequent
    const rare5 = sorted.slice(-5).map((x) => ({ ...x, isChance: false }));
    if (sortedChance.length > 0) rare5.push({ ...sortedChance[sortedChance.length - 1], isChance: true });

    setTopNumbers(top5);
    setRareNumbers(rare5);

    // dernier numéro chance (tirage le plus récent d'après date si possible)
    const withDate = data.filter(d => d && d.date).slice();
    if (withDate.length) {
      withDate.sort((a, b) => new Date(b.date) - new Date(a.date));
      setLastLucky(withDate[0].chance ?? null);
    } else {
      setLastLucky(null);
    }
  }

  const handleClick = (num, isChance = false) => {
    setSelected({ num, isChance });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <img src="https://cdn-icons-png.flaticon.com/512/14284/14284630.png" alt="rocket" className="w-8 h-8" />
        LotoStats
      </h1>

      {loading ? (
        <div className="py-12 text-lg">⏳ Chargement des tirages…</div>
      ) : (
        <div className="w-full max-w-4xl">
          <StatsWrapper mostFrequent={topNumbers} rarest={rareNumbers} onNumberClick={handleClick} />
        </div>
      )}

      <footer className="mt-10 text-gray-700 text-sm">
        Made with <span className="text-red-500">❤️</span> by <span className="font-semibold">Skalito</span>
      </footer>

      {selected && (
        <NumberModal
          number={selected.num}
          isChance={selected.isChance}
          draws={draws}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

const API_URL =
  "https://data.opendatasoft.com/api/records/1.0/search/?dataset=resultats-loto-2019-a-aujourd-hui%40agrall&rows=5000";

export default function LotoStats() {
  const [rares, setRares] = useState([]); // [[num, count], ...] (5 plus timides)
  const [rareChance, setRareChance] = useState(null); // [num, count]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const freq = {};
      const freqChance = {};

      (data.records || []).forEach((rec) => {
        const f = rec.fields || {};
        // cinq boules
        for (let i = 1; i <= 5; i++) {
          const n = f[`boule_${i}`];
          if (n != null) freq[n] = (freq[n] || 0) + 1;
        }
        // numéro chance
        const c = f.numero_chance;
        if (c != null) freqChance[c] = (freqChance[c] || 0) + 1;
      });

      // convertir en tableau [num, count], trier asc par count puis par numéro
      const rareArr = Object.entries(freq)
        .map(([k, v]) => [parseInt(k, 10), v])
        .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

      const rareChanceArr = Object.entries(freqChance)
        .map(([k, v]) => [parseInt(k, 10), v])
        .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

      setRares(rareArr.slice(0, 5));
      setRareChance(rareChanceArr.length ? rareChanceArr[0] : null);
    } catch (e) {
      setError(String(e.message || e));
      setRares([]);
      setRareChance(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl mt-8">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold">🔎 Les 5 chiffres les plus timides</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="text-sm px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
            title="Rafraîchir"
          >
            🔄 Rafraîchir
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Chargement des données…</div>
      ) : error ? (
        <div className="py-6 text-center text-red-600">Erreur : {error}</div>
      ) : (
        <>
          <div className="flex gap-4 justify-center mb-4 flex-wrap">
            {rares.map(([num, count]) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  title={`${count} occurrences`}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-lg shadow"
                >
                  {num}
                </div>
                <div className="text-xs text-gray-500 mt-2">{count}x</div>
              </div>
            ))}

            {rareChance ? (
              <div className="flex flex-col items-center">
                <div
                  title={`Chance: ${rareChance[1]} occurrences`}
                  className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-400 text-yellow-900 font-bold text-2xl shadow-lg"
                >
                  {rareChance[0]}
                </div>
                <div className="text-xs text-gray-500 mt-2">Chance · {rareChance[1]}x</div>
              </div>
            ) : null}
          </div>

          <p className="text-center text-sm text-gray-600">
            Les chiffres sont calculés sur l'ensemble des tirages disponibles depuis l'API.
          </p>
        </>
      )}
    </div>
  );
}

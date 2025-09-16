// src/components/RandomSuggestion.jsx
import React, { useState } from "react";
import NumberBall from "./NumberBall";

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function RandomSuggestion({ top10Numbers, top5Chances }) {
  const [combo, setCombo] = useState(generateCombo());

  function generateCombo() {
    const numbers = getRandomElements(top10Numbers, 5).sort((a, b) => a - b);
    const chance = getRandomElements(top5Chances, 1)[0];
    return { numbers, chance };
  }

  const handleNewCombo = () => {
    setCombo(generateCombo());
  };

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/10 backdrop-blur-md mt-6 text-center">
      <h2 className="text-lg font-bold mb-4">✨ Proposition aléatoire basée sur les stats</h2>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {combo.numbers.map((num, idx) => (
          <NumberBall key={idx} number={num} />
        ))}
        <NumberBall number={combo.chance} isChance />
      </div>
      <button
        onClick={handleNewCombo}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
      >
        🔄 Générer une nouvelle combinaison
      </button>
    </div>
  );
}

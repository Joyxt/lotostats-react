// src/components/NumberBall.jsx
import React from "react";

export default function NumberBall({ number, isChance = false }) {
  const display = typeof number === "number" && !Number.isNaN(number) ? number : "-";
  const base = isChance ? "bg-orange-300 text-black" : "bg-white text-black";

  return (
    <div className="relative flex items-center justify-center">
      {isChance && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl pointer-events-none" aria-hidden>
          🍀
        </span>
      )}
      <div className={`w-12 h-12 rounded-full shadow-md flex items-center justify-center text-base font-semibold ${base}`}>
        {display}
      </div>
    </div>
  );
}

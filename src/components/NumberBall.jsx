// src/components/NumberBall.jsx
import React from "react";

export default function NumberBall({ number, isChance = false, size = 45 }) {
  // size en px (par défaut ~56 => w-14 h-14)
  const w = Math.round(size);
  const style = {
    width: `${w}px`,
    height: `${w}px`,
  };

  return (
    <div className="relative flex flex-col items-center" style={{ width: `${w}px` }}>
      {/* Boule */}
      <div
        className={`flex items-center justify-center rounded-full shadow-md text-lg font-semibold transition-transform`}
        style={{
          ...style,
          background: isChance ? "#f6b87d" : "#ffffff",
        }}
      >
        <span>{typeof number !== "undefined" ? number : "—"}</span>
      </div>

      {/* Trèfle (au dessus, légèrement à droite) */}
      {isChance && (
        <div
          className="absolute"
          style={{
            top: -12,
            right: -6,
            pointerEvents: "none",
          }}
        >
          <span role="img" aria-label="trèfle" style={{ fontSize: 20 }}>
            🍀
          </span>
        </div>
      )}
    </div>
  );
}

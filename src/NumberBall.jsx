import React from "react";

export default function NumberBall({ number, isChance, onClick }) {
  return (
    <div
      onClick={() => onClick(number)}
      className={`w-16 h-16 flex items-center justify-center rounded-full shadow-md cursor-pointer transition 
        ${isChance ? "bg-orange-200 text-orange-800" : "bg-white text-gray-900"} 
        hover:scale-110 hover:shadow-lg`}
    >
      <span className="text-lg font-bold">{number}</span>
    </div>
  );
}

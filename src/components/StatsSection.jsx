// src/components/StatsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import NumberBall from "./NumberBall";

function InnerSection({ title, numbers, onNumberClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 bg-white/20 backdrop-blur rounded-2xl shadow-md w-full max-w-4xl"
    >
      {/* Titre centré */}
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>

      {/* Boules centrées */}
      <div className="flex items-end justify-center gap-5 flex-wrap">
        {numbers.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onNumberClick(item.num, !!item.isChance)}
          >
            <NumberBall number={item.num} isChance={!!item.isChance} />
            <span className="text-xs text-gray-700 mt-1">{item.count}x</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function StatsWrapper({ mostFrequent = [], rarest = [], onNumberClick }) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <InnerSection
        title="🎉 Les 5 numéros les plus sortis"
        numbers={mostFrequent}
        onNumberClick={onNumberClick}
      />
      <InnerSection
        title="🔍 Les 5 numéros les plus rares"
        numbers={rarest}
        onNumberClick={onNumberClick}
      />
    </div>
  );
}

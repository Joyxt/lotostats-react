// src/components/StatsWrapper.jsx
import React from "react";
import { motion } from "framer-motion";
import NumberBall from "./NumberBall";

/**
 * InnerSection : une seule card centrée et équilibrée
 */
function InnerSection({ title, numbers, onNumberClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-white/20 backdrop-blur rounded-2xl shadow-md w-full max-w-3xl mx-auto px-4 py-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>

      <div className="flex flex-wrap md:flex-nowrap items-end justify-center gap-4 md:gap-6">
        {numbers.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
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

/**
 * StatsWrapper : contient les deux sections avec un espace vertical
 */
export default function StatsWrapper({ mostFrequent = [], rarest = [], onNumberClick }) {
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <InnerSection title="🎉 Les 5 numéros les plus sortis" numbers={mostFrequent} onNumberClick={onNumberClick} />
      <InnerSection title="🔍 Les 5 numéros les plus rares" numbers={rarest} onNumberClick={onNumberClick} />
    </div>
  );
}

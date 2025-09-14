import { useState } from "react";

function CounterCard() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
      <p className="mb-4 text-lg">
        Compteur : <span className="font-semibold">{count}</span>
      </p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        ➕ Incrémenter
      </button>
    </div>
  );
}

export default CounterCard;

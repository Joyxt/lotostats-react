import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 font-medium">Chargement des données...</p>
    </div>
  );
}

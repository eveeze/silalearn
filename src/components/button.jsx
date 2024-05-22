import React from "react";

export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="text-black w-full border-2 border-merah-800 bg-merah-100 focus:ring-2 focus:outline-none focus:ring-merah-700  shadow-lg shadow-red-500/50 dark:shadow-lg hover:bg-merah-200 hover:border-2 hover:border-merah-700 font-medium rounded-xl text-sm px-8 py-4 text-center me-2 mb-2 mt-4"
    >
      {children}
    </button>
  );
}

import React from "react";

export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="text-white w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-8 py-4 text-center me-2 mb-2 mt-4"
    >
      {children}
    </button>
  );
}

// components/adminButton.jsx
import React from "react";

export default function AdminButton2({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`text-white w-[160px] bg-merah-600 hover:bg-merah-700 focus:ring-4 focus:outline-none focus:ring-red-800   font-medium rounded-lg text-sm px-8 py-4 text-center me-2 mb-2 mt-4 ${className}`}
    >
      {children}
    </button>
  );
}

"use client";
import { useState } from "react";

export default function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl">
        <div className="text-black text-2xl font-semibold font-['Inter']">
          SilaLearn
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-black text-xl font-normal font-['Inter']">
            Home
          </a>
          <a
            href="/course"
            className="text-black text-xl font-normal font-['Inter']"
          >
            Course
          </a>
          <a
            href="/quiz"
            className="text-black text-xl font-normal font-['Inter']"
          >
            Quiz
          </a>
        </div>
        <div className="flex items-center space-x-5">
          <a
            href="/signin"
            className="px-4 py-2 bg-red-500 text-white text-xs font-black font-['Inter'] rounded"
          >
            Sign In
          </a>
          <button
            className="md:hidden text-black"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 space-y-2 shadow-md">
          <a
            href="/"
            className="block text-black text-xl font-normal font-['Inter']"
          >
            Home
          </a>
          <a
            href="/course"
            className="block text-black text-xl font-normal font-['Inter']"
          >
            Course
          </a>
          <a
            href="/quiz"
            className="block text-black text-xl font-normal font-['Inter']"
          >
            Quiz
          </a>
          <a
            href="/signin"
            className="block px-4 py-2 bg-red-500 text-white text-xs font-black font-['Inter'] rounded"
          >
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
}

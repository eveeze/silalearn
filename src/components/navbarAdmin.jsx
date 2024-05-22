"use client";
import { useState } from "react";
import { josefin } from "@/app/layout";
import Link from "next/link";
export default function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`bg-merah-100 p-4 shadow-sm `}>
      <div
        className={`container mx-auto flex justify-between items-center max-w-screen-xl ${josefin.className}`}
      >
        <div className="text-black text-2xl font-semibold ">SilaLearn</div>
        <div className="hidden md:flex space-x-8">
          <Link
            href="/admin/dashboard"
            className="text-black text-xl font-normal "
          >
            Home
          </Link>
          <Link
            href="/admin/dashboard/course"
            className="text-black text-xl font-normal "
          >
            Course
          </Link>
          <Link href="/quiz" className="text-black text-xl font-normal ">
            Quiz
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <Link
            href="/signin"
            className="px-4 py-2 bg-red-500 text-white text-xs font-black  rounded"
          >
            Sign In
          </Link>
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
          <Link href="/" className="block text-black text-xl font-normal ">
            Home
          </Link>
          <Link
            href="/course"
            className="block text-black text-xl font-normal "
          >
            Course
          </Link>
          <Link href="/quiz" className="block text-black text-xl font-normal ">
            Quiz
          </Link>
          <Link
            href="/signin"
            className="block px-4 py-2 bg-red-500 text-white text-xs font-black  rounded"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

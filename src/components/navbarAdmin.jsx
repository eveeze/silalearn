"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { josefin } from "@/app/layout";
import Link from "next/link";

export default function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch admin data from session or an API endpoint
    const fetchAdminData = async () => {
      try {
        const res = await fetch("/api/admin/session");
        if (res.ok) {
          const data = await res.json();
          setAdminName(data.user.fullName);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        router.push("/admin/login");
      }
    };

    fetchAdminData();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/admin/login");
      } else {
        const data = await res.json();
        console.error("Failed to logout", data.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  };

  return (
    <nav className={`bg-merah-100 p-4 shadow-sm`}>
      <div
        className={`container mx-auto flex justify-between items-center max-w-screen-xl ${josefin.className}`}
      >
        <div className="text-black text-2xl font-semibold">SilaLearn</div>
        <div className="hidden md:flex space-x-8">
          <Link
            href="/admin/dashboard"
            className="text-black text-xl font-normal"
          >
            Home
          </Link>
          <Link
            href="/admin/dashboard/course"
            className="text-black text-xl font-normal"
          >
            Course
          </Link>
          <Link
            href="/admin/dashboard/quiz"
            className="text-black text-xl font-normal"
          >
            Quiz
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white text-xs font-black rounded"
          >
            Logout
          </button>
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
        <div className="md:hidden bg-white p-4 space-y-2 shadow-md mt-2">
          <Link
            href="/admin/dashboard"
            className="block text-black text-xl font-normal"
          >
            Home
          </Link>
          <Link
            href="/admin/dashboard/course"
            className="block text-black text-xl font-normal"
          >
            Course
          </Link>
          <Link
            href="/admin/dashboard/quiz"
            className="block text-black text-xl font-normal"
          >
            Quiz
          </Link>
        </div>
      )}
    </nav>
  );
}

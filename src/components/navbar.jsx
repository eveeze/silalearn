// components/navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { righteous } from "@/app/layout";
export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/session", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log("User not authenticated");
      }
    };

    fetchUser();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-merah-100 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/logo/logo_silalearn.png"
            alt="Logo company"
            width={32}
            height={32}
          />
          <span
            className={`self-center text-2xl whitespace-nowrap ${righteous.className}`}
          >
            Silalearn
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-5">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-black"> {user.fullName}</span>
              <button
                onClick={handleLogout}
                className="text-black bg-merah-300 hover:bg-merah-100 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/register">
              <button
                type="button"
                className="text-white bg-merah-300 hover:bg-merah-100 focus:ring-2 focus:outline-none focus:ring-red-300 hover:border-[1px] hover:border-merah-300 hover:text-merah-300 font-medium rounded-lg text-[10px] px-4 py-2 text-center"
              >
                Sign Up
              </button>
            </Link>
          )}
          <button
            onClick={toggleNav}
            type="button"
            data-collapse-toggle="navbar-sticky"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded={isNavOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isNavOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-merah-300 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/learn"
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-merah-300 md:p-0"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-merah-300 md:p-0"
              >
                Quiz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

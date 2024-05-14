"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/input";
import Button from "@/components/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName: name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Registration failed");
        return;
      }

      // Registration successful, redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed");
    }
  };

  return (
    <div className="bg-merah-100">
      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 p-16 space-y-4 w-full max-w-screen-2xl min-h-dvh justify-center">
          <div className="p-8 space-y-4 border-4 border-merah-400 rounded-2xl bg-merah-300">
            <div className="p-4 space-y-4">
              <div className="flex gap-8">
                <Image
                  src="/logo/logo_silalearn.png"
                  width={50}
                  height={50}
                  alt="logo silalearn"
                />
                <h1 className="mt-2 text-2xl font-semibold">SILALEARN</h1>
              </div>
              <div>
                <p className="text-xl font-bold">Selamat Datang</p>
                <p className="text-md text-regular mt-2">
                  Daftar sekarang dan improve cara belajar Pancasila anda!!!
                </p>
                <div className="mt-2">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    title="Full Name"
                    placeholder="Agil Ghani"
                    className="mt-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    title="Email"
                    placeholder="something@gmail"
                    className="mt-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    id="Password"
                    name="Password"
                    title="Password"
                    placeholder="********"
                    className="mt-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button type="submit">Sign up</Button>
                <p>
                  Sudah memiliki akun? <Link href="/login">Sign In</Link>
                </p>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="hidden md:block">
              <Image
                src="/image/register_bg.png"
                alt="login background"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

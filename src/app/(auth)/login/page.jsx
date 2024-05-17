"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Login failed");
        return;
      }

      // Login successful, redirect to home page or dashboard
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="bg-merah-100">
          <div className="grid grid-cols-1 md:grid-cols-2 p-16 space-y-4 w-full max-w-screen-2xl min-h-dvh justify-center">
            <div className="flex items-center justify-center">
              <div className="hidden md:block">
                <Image
                  src="/image/login_bg.png"
                  alt="login background"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            <div className="p-8 space-y-4 border-4 border-merah-400 rounded-2xl bg-merah-300">
              <div className="p-4 space-y-4">
                <div className="flex gap-8">
                  <Image
                    src="/logo/logo_silalearn.png"
                    width={50}
                    height={50}
                    alt="logo silalearn"
                  />
                  <h1 className="mt-2 text-2xl font-semibold ">SILALEARN</h1>
                </div>
                <div>
                  <p className="text-xl font-bold">Selamat Datang</p>
                  <p className="text-md text-regular mt-2">
                    Permudah Belajar Pancasila dengan SILALEARN
                  </p>
                  <div className="mt-2">
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
                      id="password"
                      name="password"
                      title="Password"
                      placeholder="********"
                      className="mt-4"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div class="grid grid-cols-2 items-start mt-2 ">
                    <div class="flex items-center ">
                      <Input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      />
                      <div class="px-2 mt-[10px] text-sm">
                        <label
                          for="remember"
                          className="text-black font-semibold mt-4"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button type="submit">Sign in</Button>
                  <p>
                    Belum punya akun ? <Link href={"/register"}>Sign Up</Link>
                  </p>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

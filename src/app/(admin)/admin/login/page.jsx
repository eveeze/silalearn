"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/input";
import Button from "@/components/button";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-screen-xl mx-auto space-y-8 p-8 pb-16"
    >
      <div className="w-[679px] h-[550px] rounded-2xl flex flex-col mx-auto bg-merah-300 border-2 border-black p-8 mt-8">
        <div className="flex gap-2">
          <Image
            src={"/logo/logo_silalearn.png"}
            width={50}
            height={50}
            alt="silalearn logo"
            className=""
          />
          <h1 className="text-2xl font-bold mt-3">Silalearn</h1>
        </div>
        <div className="p-3 text-center">
          <h2 className="font-bold text-3xl">Admin Login</h2>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div>
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
          <br />
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
        <div className="mt-4">
          <Button type="submit" className="">
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}

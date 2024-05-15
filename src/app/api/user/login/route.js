import { verifyPassword } from "@/utils/auth";
import prisma from "@/lib/prisma";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { email, password, rememberMe } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await verifyPassword(password, user.hashedPassword))) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Jika rememberMe bernilai true, atur cookie
    if (rememberMe) {
      const token = generateUniqueToken(); // Anda perlu menulis fungsi generateUniqueToken
      const cookieHeader = serialize("authToken", token, {
        maxAge: 30 * 24 * 60 * 60, // Cookie akan kedaluwarsa dalam 30 hari
        httpOnly: true,
        path: "/", // Cookie dapat diakses dari seluruh situs
      });
      res.setHeader("Set-Cookie", cookieHeader);
    }

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}

import { verifyPassword } from "@/utils/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req) {
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

    // Generate auth token (implement your own token generation logic)
    const authToken = "generated-auth-token"; // Replace with actual token generation

    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : undefined; // 30 days

    return NextResponse.json(
      { message: "Login successful", user },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialize("authToken", authToken, {
            maxAge,
            httpOnly: true,
            path: "/",
          }),
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}

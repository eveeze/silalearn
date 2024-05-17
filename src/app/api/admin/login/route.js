import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function POST(req) {
  const { email, password, rememberMe } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || !(await verifyPassword(password, admin.hashedPassword))) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ adminId: admin.id }, secret, {
      expiresIn: rememberMe ? "30d" : "1d",
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
    };

    if (rememberMe) {
      cookieOptions.maxAge = 30 * 24 * 60 * 60; // 30 days
    }

    return NextResponse.json(
      { message: "Login successful", admin },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialize("authToken", token, cookieOptions),
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

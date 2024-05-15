import { hashPassword } from "@/utils/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { fullName, email, password } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { message: "FullName, email, and password are required" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User registration failed", error: error.message },
      { status: 500 }
    );
  }
}

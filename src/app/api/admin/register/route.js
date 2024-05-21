import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/auth";

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

    const newAdmin = await prisma.admin.create({
      data: {
        fullName,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Admin registered successfully", admin: newAdmin },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Admin registration failed", error: error.message },
      { status: 500 }
    );
  }
}

// app/api/user/login/route.js
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/utils/auth";
export async function POST(req) {
  const { email, password } = await req.json();
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (
      user &&
      user.role === "USER" &&
      (await verifyPassword(password, user.hashedPassword))
    ) {
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1d",
      });
      await prisma.session.create({
        data: {
          token,
          userId: user.id,
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        },
      });

      const response = NextResponse.json({ message: "Login successful" });
      response.cookies.set("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

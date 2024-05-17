// app/api/user/session/route.js
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authToken = req.cookies.get("authToken");

  if (!authToken) {
    return NextResponse.json(
      { message: "Authentication token not found" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(authToken, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token", error: error.message },
      { status: 401 }
    );
  }
}

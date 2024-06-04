// app/api/user/verify-token/route.js

import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token is required" },
        { status: 400 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Token is valid, send success response
    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (error) {
    // Token verification failed
    return NextResponse.json(
      { message: "Token verification failed" },
      { status: 401 }
    );
  }
}

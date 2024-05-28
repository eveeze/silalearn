// app/middleware.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      return NextResponse.next();
    }

    const decoded = jwt.verify(authToken, JWT_SECRET);
    const session = await prisma.session.findUnique({
      where: { token: authToken },
      include: { user: true },
    });

    if (!session || session.user.id !== decoded.id) {
      return NextResponse.next();
    }

    req.user = session.user; // Attach the user to the request
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error.message);
    return NextResponse.next();
  }
}
export async function authenticateToken(req, tokenName = "authToken") {
  const token = req.cookies.get(tokenName)?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user ? { ...user, role: decoded.role } : null;
  } catch (error) {
    return null;
  }
}
export function isAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
}

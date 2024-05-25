// api/user/logout.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req) {
  const token = req.cookies.get("authToken")?.value;

  try {
    if (token) {
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("authToken", "", {
      maxAge: -1,
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}

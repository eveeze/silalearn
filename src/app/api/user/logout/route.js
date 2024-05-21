// api/user/logout.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const authToken = req.cookies.authToken;

    if (authToken) {
      await prisma.session.delete({
        where: { token: authToken },
      });
    }

    return NextResponse.json(
      { message: "Logout successful" },
      {
        status: 200,
        headers: {
          "Set-Cookie": serialize("authToken", "", {
            maxAge: -1,
            httpOnly: true,
            path: "/",
          }),
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}

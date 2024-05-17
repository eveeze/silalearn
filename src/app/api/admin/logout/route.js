// app/api/user/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: -1, // Immediately expire the cookie
    path: "/",
  });

  return response;
}

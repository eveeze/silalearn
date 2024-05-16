import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  res.setHeader(
    "Set-Cookie",
    serialize("authToken", "", {
      maxAge: -1, // Set the cookie expiration in the past to delete it
      httpOnly: true,
      path: "/", // Cookie can be accessed from the entire site
    })
  );

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}

import { NextResponse } from "next/server";
import { parse } from "cookie";

export default async function logoutHandler(req, res) {
  if (req.method !== "POST") {
    return NextResponse.methodNotAllowed();
  }

  const cookies = parse(req.headers.cookie || "");
  if (cookies.rememberMe) {
    res.setHeader(
      "Set-Cookie",
      serialize("rememberMe", "", {
        maxAge: -1,
        httpOnly: true,
        path: "/",
      })
    );
  }

  return NextResponse.json({ message: "Logout successful" });
}

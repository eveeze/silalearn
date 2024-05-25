import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = req.cookies.get("adminAuthToken")?.value;

  try {
    if (token) {
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    const response = NextResponse.json({ message: "Logout successful" });
    response.cookies.set("adminAuthToken", "", {
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

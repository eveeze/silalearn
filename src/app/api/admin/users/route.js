// api/admin/users/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";

export async function GET(req) {
  const user = await authenticateToken(req);

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        courses: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

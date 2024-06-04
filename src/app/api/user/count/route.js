// api/user/count/route.js

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userCount = await prisma.user.count({
      where: { role: "USER" },
    });
    return NextResponse.json({ count: userCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

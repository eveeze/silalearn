import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courseCount = await prisma.course.count();
    return NextResponse.json({ count: courseCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course count:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

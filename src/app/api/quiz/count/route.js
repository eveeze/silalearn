import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const quizCount = await prisma.quiz.count();
    return NextResponse.json({ count: quizCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz count:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

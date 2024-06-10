// api/quiz/count/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Fetching quiz count");
  try {
    const quizCount = await prisma.quiz.count();
    console.log("Quiz count fetched:", quizCount);
    const response = NextResponse.json({ count: quizCount }, { status: 200 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching quiz count:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

// app/api/quiz/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching quizzes", error: error.message },
      { status: 500 }
    );
  }
}

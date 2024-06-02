// app/api/quiz/index/route.js

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

    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving quizzes", error: error.message },
      { status: 500 }
    );
  }
}

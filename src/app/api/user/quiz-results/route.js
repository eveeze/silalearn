// api/user/quiz-results/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersWithQuizResults = await prisma.user.findMany({
      where: { role: "USER" },
      include: {
        quizResults: {
          distinct: ["quizId"],
          orderBy: { startedAt: "asc" },
          include: {
            quiz: true,
          },
        },
      },
    });

    return NextResponse.json(usersWithQuizResults, { status: 200 });
  } catch (error) {
    console.error("Error fetching users with quiz results:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

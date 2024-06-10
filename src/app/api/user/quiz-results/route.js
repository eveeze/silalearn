// api/user/quiz-results/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Fetching users with quiz results");
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

    console.log("Users with quiz results fetched:", usersWithQuizResults);
    const response = NextResponse.json(usersWithQuizResults, { status: 200 });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching users with quiz results:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

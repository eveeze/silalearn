import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, description, questions } = await req.json();

  if (!id || !title || !description || !Array.isArray(questions)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const quizExists = await prisma.quiz.findUnique({ where: { id } });
    if (!quizExists) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        title,
        description,
        questions: {
          deleteMany: {}, // Delete existing questions
          create: questions.map((q) => ({
            content: q.content,
            type: q.type,
            options: {
              create: q.options.map((o) => ({
                content: o.content,
                isCorrect: o.isCorrect,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating quiz", error: error.message },
      { status: 500 }
    );
  }
}

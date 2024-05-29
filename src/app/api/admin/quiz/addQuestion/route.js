// app/api/admin/quiz/addQuestion/route.js
import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId, question } = await req.json();

  if (
    !quizId ||
    !question ||
    !question.content ||
    !Array.isArray(question.options)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const quizExists = await prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quizExists) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const newQuestion = await prisma.question.create({
      data: {
        content: question.content,
        type: question.type,
        quizId,
        options: {
          create: question.options.map((o) => ({
            content: o.content,
            isCorrect: o.isCorrect,
          })),
        },
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding question", error: error.message },
      { status: 500 }
    );
  }
}

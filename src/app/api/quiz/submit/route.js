// app/api/quiz/submit.js
import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "authToken");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { quizId, answers } = await req.json();

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    let score = 0;
    answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (question) {
        const correctOption = question.options.find((o) => o.isCorrect);
        if (correctOption && correctOption.id === answer.optionId) {
          score += question.type === "HOTS" ? 1000 : 400;
        }
      }
    });

    const quizResult = await prisma.quizResult.create({
      data: {
        score,
        duration: answers.reduce((total, answer) => total + answer.duration, 0),
        startedAt: new Date(answers[0].startedAt),
        userId: user.id,
        quizId: quiz.id,
      },
    });

    return NextResponse.json(quizResult, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error submitting quiz", error: error.message },
      { status: 500 }
    );
  }
}

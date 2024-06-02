// app/api/quiz/submit/route.js
import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "authToken");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let quizId, answers, duration;
  try {
    const body = await req.json();
    quizId = body.quizId;
    answers = body.answers;
    duration = body.duration;

    if (
      !quizId ||
      !Array.isArray(answers) ||
      answers.length === 0 ||
      !duration
    ) {
      throw new Error("Invalid input");
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

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
    let startedAt;

    answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q.id === answer.questionId);
      if (question) {
        const correctOption = question.options.find((o) => o.isCorrect);
        if (correctOption && correctOption.id === answer.optionId) {
          score += question.type === "HOTS" ? 1000 : 400;
        }
      }
      if (!startedAt || new Date(answer.startedAt) < new Date(startedAt)) {
        startedAt = answer.startedAt;
      }
    });

    const quizResult = await prisma.quizResult.create({
      data: {
        score,
        duration,
        startedAt: new Date(startedAt),
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

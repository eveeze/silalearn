// app/api/admin/quiz/create/route.js

import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, questions } = await req.json();

  if (!title || !description || !Array.isArray(questions)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    for (const question of questions) {
      if (question.options.length > 5) {
        return NextResponse.json(
          { error: "Each question can have a maximum of 5 options" },
          { status: 400 }
        );
      }

      const correctOptions = question.options.filter(
        (option) => option.isCorrect
      );
      if (correctOptions.length > 1) {
        return NextResponse.json(
          { error: "Only one option can be marked as correct per question" },
          { status: 400 }
        );
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        questions: {
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

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating quiz", error: error.message },
      { status: 500 }
    );
  }
}

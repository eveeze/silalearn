// app/api/admin/quiz/editQuestion/route.js

import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, question } = await req.json();

  if (
    !id ||
    !question ||
    !question.content ||
    !Array.isArray(question.options)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const questionExists = await prisma.question.findUnique({ where: { id } });
    if (!questionExists) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        content: question.content,
        type: question.type,
        options: {
          deleteMany: {}, // Delete existing options
          create: question.options.map((o) => ({
            content: o.content,
            isCorrect: o.isCorrect,
          })),
        },
      },
    });

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating question", error: error.message },
      { status: 500 }
    );
  }
}

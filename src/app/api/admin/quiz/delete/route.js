// app/api/admin/quiz/delete/route.js
import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    await prisma.quiz.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Quiz deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting quiz", error: error.message },
      { status: 500 }
    );
  }
}

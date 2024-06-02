// app/api/admin/quiz/delete/route.js
import prisma from "@/lib/prisma";
import { authenticateToken } from "@/middleware";
import { isAdmin } from "@/utils/isAdmin";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const user = await authenticateToken(req, "adminAuthToken");

    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    await prisma.quiz.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting quiz", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Quiz deleted successfully" },
    { status: 200 }
  );
}

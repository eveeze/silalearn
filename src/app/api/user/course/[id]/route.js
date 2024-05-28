// app/api/user/course/[id]/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticateToken } from "@/middleware";

export async function POST(req, { params }) {
  const user = await authenticateToken(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Simpan hubungan antara pengguna dan kursus
    await prisma.user.update({
      where: { id: user.id },
      data: {
        courses: {
          connect: { id: parseInt(id) },
        },
      },
    });

    return NextResponse.json({ message: "Course enrolled" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

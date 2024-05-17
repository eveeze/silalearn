// app/api/course/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        admin: true,
        quizzes: true,
      },
    });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching courses", error },
      { status: 500 }
    );
  }
}

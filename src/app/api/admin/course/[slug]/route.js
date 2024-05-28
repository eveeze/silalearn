// app/api/admin/course/[slug]/route.js

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticateToken } from "@/middleware";
const isAdmin = (user) => user.role === "ADMIN";
export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const course = await prisma.course.findUnique({
      where: { slug },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { slug } = params;
  const { title, description, videoUrl } = await req.json();

  try {
    const updatedCourse = await prisma.course.update({
      where: { slug },
      data: { title, description, videoUrl },
    });
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = params;

    await prisma.course.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Course deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

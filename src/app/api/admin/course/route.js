import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authenticateToken } from "@/middleware";
import slugify from "slugify";

// Middleware to check if the user is an admin
const isAdmin = (user) => user.role === "ADMIN";

export async function POST(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, videoUrl } = await req.json();
    const slug = slugify(title, { lower: true });

    const course = await prisma.course.create({
      data: {
        title,
        description,
        videoUrl,
        slug,
        adminId: user.id,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, description, videoUrl } = await req.json();
    const slug = slugify(title, { lower: true });

    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        videoUrl,
        slug,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    await prisma.course.delete({
      where: { id: parseInt(id) },
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

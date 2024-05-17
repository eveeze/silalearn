// app/api/course/delete/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/utils/auth";

export async function DELETE(req) {
  const session = await getSession(req);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.course.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting course", error },
      { status: 500 }
    );
  }
}

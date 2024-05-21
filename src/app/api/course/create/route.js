// app/api/course/create/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/utils/auth";

export async function POST(req) {
  const session = await getSession(req);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug, title, description, price, adminId } = await req.json();

  if (!slug || !title || !adminId) {
    return NextResponse.json(
      { message: "Required fields are missing" },
      { status: 400 }
    );
  }

  try {
    const newCourse = await prisma.course.create({
      data: {
        slug,
        title,
        description,
        price,
        adminId,
      },
    });
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating course", error },
      { status: 500 }
    );
  }
}

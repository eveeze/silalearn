import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      return NextResponse.next();
    }

    const session = await prisma.session.findUnique({
      where: { token: authToken },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.next();
    }

    req.user = session.user; // Attach the user to the request
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error.message);
    return NextResponse.next();
  }
}

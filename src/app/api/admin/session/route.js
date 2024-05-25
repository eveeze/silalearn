import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { isAdmin } from "@/utils/isAdmin";
import { authenticateToken } from "@/middleware";
export async function GET(req) {
  const user = await authenticateToken(req, "adminAuthToken");

  if (!user || !isAdmin(user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user }, { status: 200 });
}

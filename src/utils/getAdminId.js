// lib/getAdminId.js
import prisma from "@/lib/prisma";

export async function getAdminId() {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (!admin) {
    throw new Error("Admin user not found");
  }

  return admin.id;
}

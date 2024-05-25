// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Titozakis1234@", 10);
  await prisma.user.upsert({
    where: { email: "mastito12@gmail.com" },
    update: {},
    create: {
      fullName: "Tito Zaki Saputro",
      email: "mastito12@gmail.com",
      hashedPassword,
      role: "ADMIN",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

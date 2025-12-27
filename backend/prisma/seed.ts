import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { Pool } from "pg";
import { seedBars } from "./seed/bars.seed";
// import { seedFriends } from "./seed/friends.seed";
import { seedGroups } from "./seed/groups.seed";
import { seedPurchases } from "./seed/purchases.seed";
import { seedQrCodes } from "./seed/qrcodes.seed";
import { seedUsers } from "./seed/users.seed";

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.$transaction([
    prisma.offer.deleteMany(),
    prisma.bar.deleteMany(),
    prisma.qRCode.deleteMany(),
    prisma.friend.deleteMany(),
    prisma.groupMember.deleteMany(),
    prisma.group.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const users = await seedUsers(prisma);
  // await seedFriends(prisma, users);
  await seedGroups(prisma, users);
  await seedPurchases(prisma, users);
  await seedQrCodes(prisma, users);
  await seedBars(prisma);

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
  .finally(() => pool.end());

import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting setup...\n");

  // Hash password for test accounts
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1️⃣ Update admins
  console.log("1️⃣ Updating admins...");
  const adminUsernames = ["poe", "romain", "dydou", "maxence"];

  for (const username of adminUsernames) {
    await prisma.user.updateMany({
      where: { username },
      data: {
        role: UserRole.ADMIN,
        barId: null,
      },
    });
    console.log(`   ✅ ${username} → ADMIN`);
  }

  // 2️⃣ Get first 2 bars
  console.log("\n2️⃣ Getting bars for staff...");
  const bars = await prisma.bar.findMany({
    take: 2,
    orderBy: { name: "asc" },
  });

  if (bars.length < 2) {
    console.log("   ⚠️  Not enough bars in database");
    return;
  }

  console.log(`   📍 Bar 1: ${bars[0].name} (${bars[0].id})`);
  console.log(`   📍 Bar 2: ${bars[1].name} (${bars[1].id})`);

  // 3️⃣ Create/Update BAR_STAFF accounts
  console.log("\n3️⃣ Creating BAR_STAFF accounts...");

  const barStaff1 = await prisma.user.upsert({
    where: { email: "barstaff1@test.com" },
    update: {
      role: UserRole.BAR_STAFF,
      barId: bars[0].id,
    },
    create: {
      email: "barstaff1@test.com",
      username: "barstaff1",
      password: hashedPassword,
      birthDate: new Date("1990-01-01"),
      role: UserRole.BAR_STAFF,
      barId: bars[0].id,
    },
  });
  console.log(`   ✅ barstaff1 → ${bars[0].name}`);

  const barStaff2 = await prisma.user.upsert({
    where: { email: "barstaff2@test.com" },
    update: {
      role: UserRole.BAR_STAFF,
      barId: bars[1].id,
    },
    create: {
      email: "barstaff2@test.com",
      username: "barstaff2",
      password: hashedPassword,
      birthDate: new Date("1990-01-01"),
      role: UserRole.BAR_STAFF,
      barId: bars[1].id,
    },
  });
  console.log(`   ✅ barstaff2 → ${bars[1].name}`);

  // 4️⃣ Create/Update CUSTOMER account
  console.log("\n4️⃣ Creating CUSTOMER account...");

  const customer = await prisma.user.upsert({
    where: { email: "customer@test.com" },
    update: {
      role: UserRole.CUSTOMER,
      barId: null,
    },
    create: {
      email: "customer@test.com",
      username: "customer",
      password: hashedPassword,
      birthDate: new Date("2000-01-01"),
      role: UserRole.CUSTOMER,
    },
  });
  console.log(`   ✅ customer → CUSTOMER`);

  // 5️⃣ Summary
  console.log("\n📊 SUMMARY\n");
  console.log("═══════════════════════════════════════════════");
  console.log("👥 ADMINS (can scan any QR)");
  console.log("───────────────────────────────────────────────");
  console.log("  • poe, romain, dydou, maxence");
  console.log("  📧 Use your existing email/password\n");

  console.log("👔 BAR STAFF (can scan only their bar)");
  console.log("───────────────────────────────────────────────");
  console.log(`  • barstaff1@test.com / password123`);
  console.log(`    📍 Bar: ${bars[0].name}`);
  console.log(`  • barstaff2@test.com / password123`);
  console.log(`    📍 Bar: ${bars[1].name}\n`);

  console.log("🙋 CUSTOMER (cannot scan)");
  console.log("───────────────────────────────────────────────");
  console.log("  • customer@test.com / password123\n");
  console.log("═══════════════════════════════════════════════");
  console.log("\n⚠️  IMPORTANT: Déconnecte-toi et reconnecte-toi");
  console.log("   pour obtenir le nouveau JWT avec le bon role!\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

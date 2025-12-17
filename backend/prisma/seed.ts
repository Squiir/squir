import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'dylan@email.com' },
    update: {},
    create: {
      email: 'dylan@email.com',
      username: 'dylan_chpr',
      password: 'hashed-password-placeholder',
      avatarUrl: 'https://i.pravatar.cc/200',
      status: 'Dyd u (dydyou) come tonight ?',
      loyaltyPoints: 1200,
      qrCodes: {
        create: [
          { label: 'Entrée' },
          { label: 'Boisson' },
          { label: 'VIP' },
        ],
      },
    },
  });

  console.log('Seeded user:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

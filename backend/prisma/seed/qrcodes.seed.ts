import { PrismaClient, User } from "@prisma/client";

export async function seedQrCodes(prisma: PrismaClient, users: User[]) {
  // Get all offers from the database to use their IDs
  const offers = await prisma.offer.findMany({
    include: { bar: true },
  });

  if (offers.length === 0) {
    console.log("No offers found, skipping QR code seeding");
    return;
  }

  for (const user of users) {
    // Create QR codes for the first few offers (limit to 6 per user)
    const offersToUse = offers.slice(0, 6);

    await prisma.qRCode.createMany({
      data: offersToUse.map((offer, index) => ({
        userId: user.id,
        label: `${offer.name} - ${offer.bar.name}`,
        offerId: offer.id,
      })),
    });
  }

  console.log(`Created QR codes for ${users.length} users`);
}

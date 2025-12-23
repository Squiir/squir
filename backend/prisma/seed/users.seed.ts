import { PrismaClient, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { iso8601ToDateTime } from "../../src/utils/date";

export async function seedUsers(prisma: PrismaClient): Promise<User[]> {
	const password = await bcrypt.hash("password123", 10);

	await prisma.user.createMany({
		data: [
			{
				email: "maxence@gmail.com",
				username: "maxou",
				password,
				status: "Sortir c'est vomir",
				avatarUrl: "https://i.pravatar.cc/150?img=1",
				loyaltyPoints: 70,
				birthDate: iso8601ToDateTime("2002-03-12T14:30:00Z"),
			},
			{
				email: "noe@gmail.com",
				username: "poe",
				password,
				status: "caps ?",
				avatarUrl: "https://i.pravatar.cc/150?img=2",
				loyaltyPoints: 50,
				birthDate: iso8601ToDateTime("2002-07-25T09:15:00Z"),
			},
			{
				email: "romain@gmail.com",
				username: "romanodu35",
				password,
				status: "si tu bois, je bois",
				avatarUrl: "https://i.pravatar.cc/150?img=3",
				loyaltyPoints: 30,
				birthDate: iso8601ToDateTime("2002-11-02T18:45:00Z"),
			},
			{
				email: "dylan@gmail.com",
				username: "dydou",
				password,
				status: "Dyd u (dydyou) come tonight ?",
				avatarUrl: "https://i.pravatar.cc/150?img=3",
				loyaltyPoints: 90,
				birthDate: iso8601ToDateTime("2002-01-19T10:05:00Z"),
			},
		]
	});

	return prisma.user.findMany();
}

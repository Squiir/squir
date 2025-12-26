import * as z from "zod";
import { UserRole } from "../user";

export const registrationSchema = z.object({
	username: z.string().min(3, "Minimum 3 caractères"),
	email: z.string().email("Email invalide"),
	password: z.string().min(8, "Minimum 8 caractères"),
	firstName: z.string().min(2, "Prénom requis"),
	lastName: z.string().min(2, "Nom requis"),
	birthDate: z
		.date({
			message: "La date de naissance est requise",
		})
		.max(new Date(), "La date ne peut pas être dans le futur"),
	role: z.nativeEnum(UserRole).optional(),
	barId: z.string().uuid().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  username: z.string().min(3, "3 caractères minimum").max(30, "30 caractères maximum"),
  password: z.string().min(8, "8 caractères minimum"),
  birthDate: z.string().min(1, "Date de naissance requise"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

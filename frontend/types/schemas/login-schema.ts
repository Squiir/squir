import * as z from "zod";

export const loginSchema = z.object({
	password: z.string().min(8),
	usernameOrEmail: z.string().min(3).or(z.email()),
});

export type LoginFormData = z.infer<typeof loginSchema>;

import { z } from "zod";

export const registerProfessionalSchema = z.object({
  email: z.string().email("Email invalide"),
  username: z.string().min(3, "3 caractères minimum").max(30, "30 caractères maximum"),
  password: z.string().min(8, "8 caractères minimum"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),

  barName: z.string().min(2, "2 caractères minimum").max(100, "100 caractères maximum"),
  barAddress: z.string().min(5, "5 caractères minimum").max(200, "200 caractères maximum"),
  arrondissement: z
    .number()
    .int()
    .min(1, "Doit être entre 1 et 20")
    .max(20, "Doit être entre 1 et 20"),
  latitude: z.number().min(-90).max(90, "Latitude doit être entre -90 et 90"),
  longitude: z.number().min(-180).max(180, "Longitude doit être entre -180 et 180"),
});

export type RegisterProfessionalFormValues = z.infer<typeof registerProfessionalSchema>;

export interface RegisterProfessionalResponse {
  accessToken: string;
  refreshToken: string;
  stripeOnboardingUrl: string;
  barId: string;
}

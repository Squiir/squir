import { z } from "zod";

export const promotionRuleSchema = z.object({
  type: z.enum(["BUY_X_GET_Y", "PERCENTAGE_OFF", "FIXED_AMOUNT_OFF"]),
  buyQuantity: z
    .number()
    .int()
    .min(1)
    .nullish()
    .transform((v) => v ?? undefined),
  getQuantity: z
    .number()
    .int()
    .min(1)
    .nullish()
    .transform((v) => v ?? undefined),
  percentageOff: z
    .number()
    .min(0)
    .max(100)
    .nullish()
    .transform((v) => v ?? undefined),
  amountOff: z
    .number()
    .min(0)
    .nullish()
    .transform((v) => v ?? undefined),
});

export const offerSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional().or(z.literal("")),
  originalPrice: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (val === undefined || val === "" || val === null) return undefined;
      const num = typeof val === "string" ? parseFloat(val) : val;
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val !== undefined && val >= 0, {
      message: "Le prix doit être positif",
    }),
  stock: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === "" || val === null) return null;
      const num = typeof val === "string" ? parseInt(val, 10) : val;
      return isNaN(num) ? null : num;
    })
    .refine((val) => val === undefined || val === null || (Number.isInteger(val) && val >= 0), {
      message: "Le stock doit être un nombre entier positif",
    }),
  validUntil: z.string().optional().or(z.literal("")),
  promotionRule: promotionRuleSchema.optional(),
});

export const createOfferSchema = offerSchema;

export const updateOfferSchema = offerSchema.extend({
  name: z.string().min(1, "Le nom est requis").optional(),
  originalPrice: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === "" || val === null) return undefined;
      const num = typeof val === "string" ? parseFloat(val) : val;
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || val >= 0, {
      message: "Le prix doit être positif",
    }),
});

export type OfferFormData = z.output<typeof offerSchema>;
export type OfferFormInput = z.input<typeof offerSchema>;

export type UpdateOfferFormData = z.output<typeof updateOfferSchema>;
export type UpdateOfferFormInput = z.input<typeof updateOfferSchema>;

import { z } from "zod";

/**
 * Shared schema for the order form. Used by:
 * - the client-side form (RHF + zodResolver)
 * - the server action that emails Chef Vee
 *
 * Keep validation identical on both sides.
 */
export const lineItemSchema = z.object({
  slug: z.string().min(1),
  qty: z.number().int().min(1).max(20),
});

export const orderSchema = z.object({
  name: z.string().trim().min(2, "Please share your name"),
  email: z.string().trim().toLowerCase().email("Please use a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone is helpful for delivery day")
    .max(24)
    .optional()
    .or(z.literal("")),
  postcode: z.string().trim().min(3, "We need a postcode for the delivery zone"),
  deliveryDate: z
    .string()
    .min(1, "Pick a date")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker"),
  occasion: z.string().trim().max(120).optional().or(z.literal("")),
  dietary: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
  marketingOptIn: z.boolean().default(false),
  gdprConsent: z.literal(true, {
    message: "Please confirm we may contact you about this order",
  }),
  items: z.array(lineItemSchema).min(1, "Add at least one dish to your order"),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;

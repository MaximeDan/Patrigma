import { z } from "zod";

// Step schema with custom error messages
export const baseStepSchema = z.object({
  id: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  puzzle: z
    .string({ required_error: "Required field" })
    .max(1000, { message: "Please enter less than 1000 characters" }),
  answer: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  hint: z
    .string({ required_error: "Required field" })
    .max(1000, { message: "Please enter less than 1000 characters" }),
  picturePuzzle: z
    .string({ required_error: "Required field" })
    .url({ message: "Please provide a valid URL" })
    .optional(),
  pictureHint: z
    .string({ required_error: "Required field" })
    .url({ message: "Please provide a valid URL" })
    .optional(),
  latitude: z.number({ required_error: "Required field" }),
  longitude: z.number({ required_error: "Required field" }),
  address: z
    .string()
    .max(255, { message: "Please enter less than 255 characters" })
    .optional(),
  city: z
    .string()
    .max(50, { message: "Please enter less than 50 characters" })
    .optional(),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, { message: "Postal code must be exactly 5 digits" })
    .optional(),
  country: z
    .string()
    .max(50, { message: "Please enter less than 50 characters" })
    .optional(),
  stepNumber: z.number({ required_error: "Required field" }).int(),
  journeyId: z.number({ required_error: "Required field" }).int().optional(),
});

// Combined schema for the body
export const stepBodySchema = z.object({
  step: baseStepSchema,
});

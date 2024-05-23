import { z } from "zod";

// Step schema
export const stepSchema = z.object({
  puzzle: z.string(),
  answer: z.string(),
  hint: z.string(),
  picturePuzzle: z.string().nullable().optional(),
  pictureHint: z.string().nullable().optional(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  stepNumber: z.number().int(),
  journeyId: z.number().int(),
});

// Combined schema for the body
export const stepBodySchema = z.object({
  step: stepSchema,
});

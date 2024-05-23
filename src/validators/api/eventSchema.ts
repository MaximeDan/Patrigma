import { z } from "zod";

// Event schema
export const eventSchema = z.object({
  authorId: z.number().int(),
  journeyId: z.number().int(),
  title: z.string(),
  image: z.string().url(),
  numberPlayerMin: z.number().int(),
  numberPlayerMax: z.number().int(),
  description: z.string(),
  isPrivate: z.boolean().optional(),
  accessCode: z.string().nullable().optional(),
  startAt: z.string().datetime(), // Using z.string() for ISO date strings
  endAt: z.string().datetime(),
});

// Combined schema for the body
export const eventBodySchema = z.object({
  event: eventSchema,
});

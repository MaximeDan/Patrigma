import { z } from "zod";
import { stepSchema } from "./stepSchema";

export const journeySchema = z.object({
  authorId: z.number().int(),
  title: z.string(),
  description: z.string(),
  requirement: z.string(),
  treasure: z.string(),
  estimatedDistance: z.number().int(),
  estimatedDuration: z.number().int().nullable().optional(),
  cluesDifficulty: z.number().int(),
  physicalDifficulty: z.number().int(),
  lastCompletion: z.string().nullable().optional(), // Using z.string() for ISO date strings
  mobilityImpaired: z.string(),
  partiallySighted: z.string(),
  partiallyDeaf: z.string(),
  cognitivelyImpaired: z.string(),
});

export const journeyWithStepsBodySchema = z.object({
  journey: journeySchema,
  steps: z.array(stepSchema),
});

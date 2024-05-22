import { z } from "zod";

// Comment schema
export const commentSchema = z.object({
  authorId: z.number().int(),
  content: z.string(),
  rating: z.number().int().nullable(),
  journeyId: z.number().int(),
});

// Combined schema for the body
export const commentBodySchema = z.object({
  comment: commentSchema,
});

import { z } from "zod";

// Comment schema with custom error messages
const baseCommentSchema = z.object({
  authorId: z.number({ required_error: "Required field" }).int(),
  content: z
    .string({ required_error: "Required field" })
    .max(500, { message: "Please enter less than 500 characters" }),
  rating: z
    .number({ required_error: "Required field" })
    .int({ message: "Please provide an integer" }),
  journeyId: z.number({ required_error: "Required field" }).int(),
});

// Combined schema for the body
export const commentBodySchema = z.object({
  comment: baseCommentSchema,
});

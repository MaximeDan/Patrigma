import { z } from "zod";

// Event schema with custom error messages
const baseEventSchema = z.object({
  authorId: z.number({ required_error: "Required field" }).int(),
  journeyId: z.number({ required_error: "Required field" }).int(),
  title: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  image: z
    .string({ required_error: "Required field" })
    .url({ message: "Please provide a valid URL" }),
  numberPlayerMin: z
    .number({ required_error: "Required field" })
    .int({ message: "Please provide an integer" }),
  numberPlayerMax: z
    .number({ required_error: "Required field" })
    .int({ message: "Please provide an integer" }),
  description: z
    .string({ required_error: "Required field" })
    .max(500, { message: "Please enter less than 500 characters" }),
  isPrivate: z.boolean({ required_error: "Required field" }),
  accessCode: z.string().optional(),
  startAt: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({ required_error: "Required field" })
  ),
  endAt: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({ required_error: "Required field" })
  ),
});

export const eventSchema = baseEventSchema.superRefine((data, ctx) => {
  if (data.isPrivate && (!data.accessCode || data.accessCode.trim() === "")) {
    ctx.addIssue({
      code: "custom",
      message: "accessCode is required when isPrivate is true",
      path: ["accessCode"],
    });
  }
});

// Combined schema for the body
export const eventBodySchema = z.object({
  event: eventSchema,
});

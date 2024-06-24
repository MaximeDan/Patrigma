import { z } from "zod";
import { baseStepSchema } from "./stepSchema";

// Journey schema with custom error messages
const baseJourneySchema = z.object({
  authorId: z
    .number({ required_error: "Required field" })
    .int({ message: "Must be an integer" }),
  title: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  description: z
    .string({ required_error: "Required field" })
    .max(500, { message: "Please enter less than 500 characters" }),
  requirement: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  treasure: z
    .string({ required_error: "Required field" })
    .max(1000, { message: "Please enter less than 1000 characters" }),
  estimatedDistance: z
    .number({ required_error: "Required field" })
    .int({ message: "Must be an integer" }),
  estimatedDuration: z
    .number({ required_error: "Required field" })
    .int({ message: "Must be an integer" }),
  cluesDifficulty: z
    .number({ required_error: "Required field" })
    .int({ message: "Must be an integer" }),
  physicalDifficulty: z
    .number({ required_error: "Required field" })
    .int({ message: "Must be an integer" }),
  lastCompletion: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({ required_error: "Required field" })
  ),
  mobilityImpaired: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  partiallySighted: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  partiallyDeaf: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
  cognitivelyImpaired: z
    .string({ required_error: "Required field" })
    .max(255, { message: "Please enter less than 255 characters" }),
});

// Schéma combiné pour le corps de la requête avec transformation des steps pour inclure journeyId
export const journeyBodySchema = z
  .object({
    journey: baseJourneySchema,
    steps: z.array(baseStepSchema),
  })
  .transform((data) => {
    const { journey, steps } = data;

    // Ajouter journeyId à chaque étape avant validation
    const stepsWithJourneyId = steps.map((step) => ({
      ...step,
      journeyId: journey.authorId,
    }));

    return { journey, steps: stepsWithJourneyId };
  });

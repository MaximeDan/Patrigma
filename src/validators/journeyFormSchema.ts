import { z } from "zod";

export const firstStepSchema = z.object({
  title: z.string({ required_error: "Ce champ est requis" }),
  description: z.string({ required_error: "Ce champ est requis" }),
  // image: z.string(),
});

export const secondStepSchema = z.object({
  requirement: z.string({ required_error: "Ce champ est requis" }),
  physicalDifficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Vous devez sélectionner une option",
  }),
  cluesDifficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Vous devez sélectionner une option",
  }),
  mobilityImpaired: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    }
  ),
  partiallySighted: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    }
  ),
  partiallyDeaf: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    }
  ),
  cognitivelyImpaired: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    }
  ),
});

export const thirdStepSchema = z.object({
  // to do: add journey steps schema
});

export const forthStepSchema = z.object({
  treasure: z.string(),
});

export const journeyFormSchema = z.object({
  ...firstStepSchema.shape,
  ...secondStepSchema.shape,
  ...thirdStepSchema.shape,
  ...forthStepSchema.shape,
});

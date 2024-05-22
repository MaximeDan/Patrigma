import { z } from "zod";

export const firstStepSchema = z.object({
  title: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  description: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  // image: z.string(),
});

export const secondStepSchema = z.object({
  requirement: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  // physicalDifficulty: z.enum(["easy", "medium", "hard"], {
  //   required_error: "Vous devez sélectionner une option",
  // }),
  // cluesDifficulty: z.enum(["easy", "medium", "hard"], {
  //   required_error: "Vous devez sélectionner une option",
  // }),
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
  steps: z
    .string()
    .min(1, { message: "Vous devez ajouter au moins une étape" }),
});

export const forthStepSchema = z.object({
  treasure: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
});

export const journeyFormSchema = z.object({
  ...firstStepSchema.shape,
  ...secondStepSchema.shape,
  ...thirdStepSchema.shape,
  ...forthStepSchema.shape,
});

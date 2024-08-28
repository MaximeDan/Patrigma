import { z } from "zod";

export const introductionStepSchema = z.object({
  title: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  description: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
});

export const detailsStepSchema = z.object({
  requirement: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  physicalDifficulty: z.enum(["1", "2", "3"], {
    required_error: "Vous devez sélectionner une option",
  }),
  cluesDifficulty: z.enum(["1", "2", "3"], {
    required_error: "Vous devez sélectionner une option",
  }),
  mobilityImpaired: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    },
  ),
  partiallySighted: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    },
  ),
  partiallyDeaf: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    },
  ),
  cognitivelyImpaired: z.enum(
    ["undefined", "unaccessible", "partiallyAccessible", "accessible"],
    {
      required_error: "Vous devez sélectionner une option",
    },
  ),
});

export const stepsOverviewStepSchema = z.object({
  steps: z
    .string()
    .min(1, { message: "Vous devez ajouter au moins deux étapes" })
    .refine(
      (val) => {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed.steps)) {
            return parsed.steps.length >= 2;
          }
          return false;
        } catch (e) {
          return false;
        }
      },
      {
        message: "Vous devez ajouter au moins deux étapes",
      },
    ),
});

export const treasureStepSchema = z.object({
  treasure: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
});

export const journeyFormSchema = z.object({
  ...introductionStepSchema.shape,
  ...detailsStepSchema.shape,
  ...stepsOverviewStepSchema.shape,
  ...treasureStepSchema.shape,
});

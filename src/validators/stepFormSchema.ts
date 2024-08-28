import { z } from "zod";

export const addStepSchema = z.object({
  puzzle: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  answer: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  hint: z.string({ required_error: "Ce champ est requis" }).min(1, {
    message: "Ce champ est requis",
  }),
  coordinates: z
    .string({ required_error: "Ce champ est requis" })
    .min(1, { message: "Ce champ est requis" }),
});

export const addStepArraySchema = z
  .object({
    puzzle: z.string({ required_error: "Ce champ est requis" }).min(1, {
      message: "Ce champ est requis",
    }),
    answer: z.string({ required_error: "Ce champ est requis" }).min(1, {
      message: "Ce champ est requis",
    }),
    hint: z.string({ required_error: "Ce champ est requis" }).min(1, {
      message: "Ce champ est requis",
    }),
    coordinates: z.object({
      latitude: z.number({ required_error: "Ce champ est requis" }),
      longitude: z.number({ required_error: "Ce champ est requis" }),
    }),
  })
  .array();

export const addStepAPISchema = z
  .object({
    puzzle: z.string({ required_error: "Ce champ est requis" }).min(1, {
      message: "Ce champ est requis",
    }),
    answer: z.string({ required_error: "Ce champ est requis" }).min(1, {
      message: "Ce champ est requis",
    }),
    hint: z.string({ required_error: "Ce champ est requis" }).min(1, {
      message: "Ce champ est requis",
    }),

    latitude: z
      .number({ required_error: "Ce champ est requis" })
      .min(-90, { message: "La latitude doit être entre -90 et 90" })
      .max(90, { message: "La latitude doit être entre -90 et 90" }),
    longitude: z
      .number({ required_error: "Ce champ est requis" })
      .min(-180, { message: "La longitude doit être entre -180 et 180" })
      .max(180, { message: "La longitude doit être entre -180 et 180" }),
  })
  .array();

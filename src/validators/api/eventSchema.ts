import { z } from "zod";

// Event schema de base avec des messages d'erreur personnalisés
const baseEventSchema = z.object({
  authorId: z.number({ required_error: "Ce champ est requis" }).int(),
  journeyId: z.number({ required_error: "Ce champ est requis" }).int(),
  title: z
    .string({ required_error: "Ce champ est requis" })
    .max(255, { message: "Veuillez renseigner moins de 255 caractères" }),
  image: z
    .string({ required_error: "Ce champ est requis" })
    .url({ message: "Veuillez fournir une URL valide" }),
  numberPlayerMin: z
    .number({ required_error: "Ce champ est requis" })
    .int({ message: "Veuillez fournir un nombre entier" }),
  numberPlayerMax: z
    .number({ required_error: "Ce champ est requis" })
    .int({ message: "Veuillez fournir un nombre entier" }),
  description: z
    .string({ required_error: "Ce champ est requis" })
    .max(500, { message: "Veuillez renseigner moins de 500 caractères" }),
  isPrivate: z.boolean({ required_error: "Ce champ est requis" }),
  accessCode: z.string().optional(),
  startAt: z.date({ required_error: "Ce champ est requis" }),
  endAt: z.date({ required_error: "Ce champ est requis" }),
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

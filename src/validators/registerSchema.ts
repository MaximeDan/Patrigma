import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Ce champ est requis" })
      .max(255, { message: "Veuillez renseigner moins de 255 caractères" })
      .refine((value) => value.trim().length > 0, {
        message: "Ce champ est requis",
      }),
    lastName: z
      .string({ required_error: "Ce champ est requis" })
      .max(255, { message: "Veuillez renseigner moins de 255 caractères" })
      .refine((value) => value.trim().length > 0, {
        message: "Ce champ est requis",
      }),
    username: z
      .string({ required_error: "Ce champ est requis" })
      .refine((value) => value.trim().length > 0, {
        message: "Ce champ est requis",
      }),
    dateOfBirth: z.preprocess(
      (val) => {
        if (typeof val === "string") return val;
        if (val instanceof Date) return val.toISOString();
        return "";
      },
      z
        .string({ required_error: "Ce champ est requis" })
        .refine(
          (val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
          },
          {
            message: "Date invalide",
          },
        )
        .refine(
          (val) => {
            const date = new Date(val);
            return date <= new Date();
          },
          {
            message: "La date ne peut pas être dans le futur",
          },
        ),
    ),
    email: z
      .string({ required_error: "Ce champ est requis" })
      .email({ message: "Email invalide" })
      .max(255, { message: "Veuillez renseigner moins de 255 caractères" })
      .refine((value) => value === value.trim(), {
        message: "L'email ne doit pas contenir d'espaces de début ou de fin",
      }),
    password: z
      .string({ required_error: "Ce champ est requis" })
      .min(8, { message: "Veuillez renseigner au moins 8 caractères" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Veuillez renseigner au moins une lettre majuscule",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Veuillez renseigner au moins un chiffre",
      })
      .refine((value) => /[!@#$%^&*+\-(),.?":{}|<>]/.test(value), {
        message: "Veuillez renseigner au moins un caractère spécial",
      }),
    confirmPassword: z
      .string({ required_error: "Ce champ est requis" })
      .min(8, { message: "Veuillez renseigner au moins 8 caractères" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Veuillez renseigner au moins une lettre majuscule",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Veuillez renseigner au moins un chiffre",
      })
      .refine((value) => /[!@#$%^&*+\-(),.?":{}|<>]/.test(value), {
        message: "Veuillez renseigner au moins un caractère spécial",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

export default registerSchema;

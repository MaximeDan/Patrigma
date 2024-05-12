import { date, z } from "zod";

const registerSchema = z.object({
  name: z
    .string({ required_error: "Ce champ est requis" })
    .max(255, { message: "Veuillez renseigner moins de 255 caractères" }),
  lastName: z
    .string({ required_error: "Ce champ est requis" })
    .max(255, { message: "Veuillez renseigner moins de 255 caractères" }),
  username: z.string({ required_error: "Ce champ est requis" }),
  dateOfBirth: date({
    required_error: "Ce champ est requis",
  }),
  // avatar: z.string().url().optional(),
  email: z
    .string({ required_error: "Ce champ est requis" })
    .email()
    .max(255, { message: "Veuillez renseigner moins de 255 caractères" }),
  password: z
    .string()
    .min(8, { message: "Veuillez renseigner au moins 8 caractères" }),
});

export default registerSchema;

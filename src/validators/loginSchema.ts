import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Ce champ est requis" }).email(),
  password: z.string({ required_error: "Ce champ est requis" }),
});

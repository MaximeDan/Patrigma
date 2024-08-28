import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string({
    required_error: "Ce champ est requis",
  }),
  description: z.string({
    required_error: "Ce champ est requis",
  }),
  numberPlayerMin: z.preprocess(
    (data) => {
      return Number(data);
    },
    z
      .number({
        required_error: "Ce champ est requis",
      })
      .min(1, {
        message: "Le nombre de joueur minimum doit être supérieur à 0",
      }),
  ),
  numberPlayerMax: z.preprocess(
    (data) => {
      return Number(data);
    },
    z
      .number({
        required_error: "Ce champ est requis",
      })
      .min(1, {
        message: "Le nombre de joueur maximum doit être supérieur à 0",
      }),
  ),

  isPrivate: z.boolean().default(false),
  accessCode: z.string().optional(),
  startAt: z.date({
    required_error: "Veuillez renseigner une date de début",
  }),
  endAt: z.date({
    required_error: "Veuillez renseigner une date de fin",
  }),
  image: z.string().url(),
});

eventFormSchema.superRefine((data, ctx) => {
  if (data.numberPlayerMax <= data.numberPlayerMin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Le nombre de joueur maximum doit être supérieur au nombre de joueur minimum",
      path: ["numberPlayerMax"],
    });
  }

  if (data.isPrivate && !data.accessCode) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Un code d'accès est requis pour une partie privée",
      path: ["accessCode"],
    });
  }
});

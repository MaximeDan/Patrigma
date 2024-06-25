import { z } from "zod";

export const eventJourneySchema = z.object({
  journeyId: z.preprocess(
    (value) => Number(value),
    z.number({
      required_error: "Ce champ est requis",
    }),
  ),
});

export const eventDataSchema = z.object({
  title: z.string({
    required_error: "Ce champ est requis",
  }),
  description: z.string({
    required_error: "Ce champ est requis",
  }),
  numberPlayerMin: z
    .number({
      required_error: "Ce champ est requis",
    })
    .min(1, {
      message: "Le nombre de joueur minimum doit être supérieur à 0",
    }),
  numberPlayerMax: z
    .number({
      required_error: "Ce champ est requis",
    })
    .max(40, {
      message: "Le nombre de joueur maximum doit être inférieur à 40",
    }),
  isPrivate: z.boolean(),
  accessCode: z.string().optional(),
});

eventDataSchema.superRefine((data, ctx) => {
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

export const eventFormSchema = z.object({
  ...eventJourneySchema.shape,
  ...eventDataSchema.shape,
});

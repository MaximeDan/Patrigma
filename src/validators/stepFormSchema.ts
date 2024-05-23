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
  // picturePuzzle: z.string({ required_error: "Ce champ est requis" }).optional(),
  // pictureHint: z.string({ required_error: "Ce champ est requis" }).optional(),
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
    // picturePuzzle: z.string({ required_error: "Ce champ est requis" }).optional(),
    // pictureHint: z.string({ required_error: "Ce champ est requis" }).optional(),
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
    // picturePuzzle: z.string({ required_error: "Ce champ est requis" }).optional(),
    // pictureHint: z.string({ required_error: "Ce champ est requis" }).optional(),
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

// const coordinates = data.coordinates.split(";");

// // check if we have exactly two parts
// if (coordinates.length !== 2) {
//   return false;
// }

// // parse float
// const latitude = parseFloat(coordinates[0]);
// const longitude = parseFloat(coordinates[1]);

// // check if both are numbers
// if (isNaN(latitude) || isNaN(longitude)) {
//   return false;
// }

// // check latitude range
// if (latitude < -90 || latitude > 90) {
//   return false;
// }

// // check longitude range
// if (longitude < -180 || longitude > 180) {
//   return false;
// }

// return true;

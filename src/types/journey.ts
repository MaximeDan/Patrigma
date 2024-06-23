import { Prisma } from "@prisma/client";

export type JourneyWithComments = Prisma.JourneyGetPayload<{
  include: { comments: true };
}>;

export type JourneyWithSteps = Prisma.JourneyGetPayload<{
  include: { steps: true };
}>;

export type JourneyWithoutDates = {
  id?: number;
  authorId: number;
  title: string;
  description: string;
  requirement: string;
  treasure: string;
  estimatedDistance: number;
  estimatedDuration?: number;
  cluesDifficulty: number;
  physicalDifficulty: number;
  lastCompletion?: Date;
  mobilityImpaired: string;
  partiallySighted: string;
  partiallyDeaf: string;
  cognitivelyImpaired: string;
};

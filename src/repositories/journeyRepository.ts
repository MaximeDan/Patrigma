import prisma from "@/lib/prisma";
import { Journey, Step } from "@prisma/client";
import { journeyWithSteps } from "@/types/journeyWithSteps";

export const createJourney = async (
  journey: Journey,
  steps: Step[]
): Promise<Journey | null> => {
  return await prisma.journey.create({
    data: {
      authorId: journey.authorId,
      title: journey.title,
      description: journey.description,
      requirement: journey.requirement,
      treasure: journey.treasure,
      estimatedDistance: journey.estimatedDistance,
      estimatedDuration: journey.estimatedDuration,
      cluesDifficulty: journey.cluesDifficulty,
      physicalDifficulty: journey.physicalDifficulty,
      lastCompletion: journey.lastCompletion,
      mobilityImpaired: journey.mobilityImpaired,
      partiallySighted: journey.partiallySighted,
      partiallyDeaf: journey.partiallyDeaf,
      cognitivelyImpaired: journey.cognitivelyImpaired,
      steps: {
        createMany: {
          data: steps.map((step) => ({
            journeyId: journey.id,
            puzzle: step.puzzle,
            answer: step.answer,
            hint: step.hint,
            picturePuzzle: step.picturePuzzle,
            pictureHint: step.pictureHint,
            coordinates: step.coordinates,
            address: step.address,
            city: step.city,
            postalCode: step.postalCode,
            country: step.country,
            stepNumber: step.stepNumber,
          })),
        },
      },
    },
  });
};

export const readJourney = async (id: number): Promise<Journey | null> => {
  return await prisma.journey.findUnique({ where: { id } });
};

export const readJourneyWithSteps = async (
  id: number
): Promise<journeyWithSteps | null> => {
  return await prisma.journey.findUnique({
    where: { id },
    include: {
      steps: {
        orderBy: {
          stepNumber: "asc",
        },
      },
    },
  });
};

export const readJourneys = async (): Promise<Journey[]> => {
  return await prisma.journey.findMany();
};

export const updateJourney = async (
  id: number,
  journey: Journey,
  steps: Step[]
): Promise<Journey | null> => {
  return await prisma.journey.update({
    where: {
      id: id,
    },
    data: {
      authorId: journey.authorId,
      title: journey.title,
      description: journey.description,
      requirement: journey.requirement,
      treasure: journey.treasure,
      estimatedDistance: journey.estimatedDistance,
      estimatedDuration: journey.estimatedDuration,
      cluesDifficulty: journey.cluesDifficulty,
      physicalDifficulty: journey.physicalDifficulty,
      lastCompletion: journey.lastCompletion,
      mobilityImpaired: journey.mobilityImpaired,
      partiallySighted: journey.partiallySighted,
      partiallyDeaf: journey.partiallyDeaf,
      cognitivelyImpaired: journey.cognitivelyImpaired,
      steps: {
        createMany: {
          data: steps.map((step) => ({
            journeyId: journey.id,
            puzzle: step.puzzle,
            answer: step.answer,
            hint: step.hint,
            picturePuzzle: step.picturePuzzle,
            pictureHint: step.pictureHint,
            coordinates: step.coordinates,
            address: step.address,
            city: step.city,
            postalCode: step.postalCode,
            country: step.country,
            stepNumber: step.stepNumber,
          })),
        },
      },
    },
  });
};

export const deleteJourney = async (id: number): Promise<Journey | null> => {
  return await prisma.journey.delete({ where: { id } });
};

import prisma from "@/lib/prisma";
import { Journey, Step } from "@prisma/client";
import { journeyWithSteps } from "@/types/journeyWithSteps";
import { journeyWithComments } from "@/types/journeyWithComments";

export const createJourney = async (
  journey: Journey,
  steps: Step[]
): Promise<journeyWithSteps | null> => {
  return await prisma.journey.create({
    include: {
      steps: {
        orderBy: {
          stepNumber: "asc",
        },
      },
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
            latitude: step.latitude,
            longitude: step.longitude,
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

export const readJourneyWithComments = async (
  id: number
): Promise<journeyWithComments | null> => {
  return await prisma.journey.findUnique({
    where: { id },
    include: {
      comments: {
        orderBy: {
          createdAt: "asc",
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
): Promise<journeyWithSteps | null> => {
  return await prisma.journey.update({
    where: {
      id: id,
    },
    include: {
      steps: {
        orderBy: {
          stepNumber: "asc",
        },
      },
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
            latitude: step.latitude,
            longitude: step.longitude,
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

import prisma from "@/lib/prisma";
import {
  JourneyWithoutDates,
  JourneyWithComments,
  JourneyWithSteps,
} from "@/types/journey";
import { StepWithoutDates } from "@/types/step";
import { Journey } from "@prisma/client";

/**
 * @params journey: Journey
 * @params steps: Step[]
 * @returns JourneyWithSteps | null
 * @description Creates a new journey with the provided data and associated steps.
 */
export const createJourney = async (
  journey: JourneyWithoutDates,
  steps: StepWithoutDates[]
): Promise<JourneyWithSteps | null> => {
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

/**
 * @params id: number
 * @returns Journey | null
 * @description Retrieves a journey by its id.
 */
export const readJourney = async (id: number): Promise<Journey | null> => {
  return await prisma.journey.findUnique({ where: { id } });
};

/**
 * @params id: number
 * @returns JourneyWithSteps | null
 * @description Retrieves a journey by its id along with associated steps.
 */
export const readJourneyWithSteps = async (
  id: number
): Promise<JourneyWithSteps | null> => {
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

/**
 * @params id: number
 * @returns JourneyWithComments | null
 * @description Retrieves a journey by its id along with associated comments.
 */
export const readJourneyWithComments = async (
  id: number
): Promise<JourneyWithComments | null> => {
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

/**
 * @returns Journey[]
 * @description Retrieves all journeys.
 */
export const readJourneys = async (): Promise<Journey[]> => {
  return await prisma.journey.findMany();
};

/**
 * @params id: number
 * @params journey: Journey
 * @params steps: Step[]
 * @returns JourneyWithSteps | null
 * @description Updates a journey with the provided data and associated steps.
 */
export const updateJourney = async (
  id: number,
  journey: JourneyWithoutDates,
  steps: StepWithoutDates[]
): Promise<JourneyWithSteps | null> => {
  return await prisma.$transaction(async (prisma) => {
    // Update the journey
    const updatedJourney = await prisma.journey.update({
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
      },
    });

    // Upsert steps
    for (const step of steps) {
      await prisma.step.upsert({
        where: {
          id: step.id ? step.id : 0, // Use step.id for existing steps
        },
        create: {
          journeyId: id,
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
        },
        update: {
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
        },
      });
    }

    return await prisma.journey.findUnique({
      where: { id },
      include: { steps: true },
    });
  });
};

/**
 * @params id: number
 * @returns Journey | null
 * @description Deletes a journey by its id.
 */
export const deleteJourney = async (id: number): Promise<Journey | null> => {
  return await prisma.journey.delete({ where: { id } });
};

import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createJourney,
  readJourney,
  readJourneys,
  updateJourney,
  deleteJourney,
  readJourneyWithSteps,
  readJourneyWithComments,
} from "../repositories/journeyRepository";
import { Journey, Step } from "@prisma/client";
import { journeyWithSteps } from "@/types/journeyWithSteps";
import { journeyWithComments } from "@/types/journeyWithComments";

/**
 * @params id: number
 * @returns Journey | null
 * @throws NotFoundException
 * @description Retrieves a journey by its id without steps.
 */
export const getJourneyById = async (id: number): Promise<Journey | null> => {
  const journey: Journey | null = await readJourney(id);
  if (!journey) throw new NotFoundException("Journey not found");

  return journey;
};

/**
 * @params id: number
 * @returns journeyWithSteps | null
 * @throws NotFoundException
 * @description Retrieves a journey by its id with its steps.
 */
export const getJourneyByIdWithSteps = async (
  id: number,
): Promise<journeyWithSteps | null> => {
  const journeyWithSteps: journeyWithSteps | null =
    await readJourneyWithSteps(id);
  if (!journeyWithSteps) throw new NotFoundException("Journey not found");

  return journeyWithSteps;
};

/**
 * @params id: number
 * @returns journeyWithComments | null
 * @throws NotFoundException
 * @description Retrieves a journey by its id with its comments.
 */
export const getJourneyByIdWithComments = async (
  id: number,
): Promise<journeyWithComments | null> => {
  const journeyWithComments: journeyWithComments | null =
    await readJourneyWithComments(id);
  if (!journeyWithComments) throw new NotFoundException("Journey not found");

  return journeyWithComments;
};

/**
 * @returns Journey[]
 * @throws NotFoundException
 * @description Retrieves all journeys without steps.
 */
export const getAllJourneys = async (): Promise<Journey[]> => {
  const journeys = await readJourneys();

  if (!journeys || journeys.length === 0)
    throw new NotFoundException("No journeys found");

  return journeys;
};

/**
 * @params id: number | null
 * @params journey: Journey
 * @params steps: Step[]
 * @returns Journey | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Creates or updates a journey based on the id value and associates it with steps.
 */
export const registerOrModifyJourney = async (
  id: number | null,
  journey: Journey,
  steps: Step[],
): Promise<Journey | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }
  if (!journey) throw new BadRequestException("Invalid journey");
  if (!steps) throw new BadRequestException("Invalid steps");

  // Check if steps are valid (unique and sequential)
  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];
    const nextStep = steps[i + 1];

    if (currentStep.stepNumber !== i + 1) {
      throw new BadRequestException("Invalid stepNumber");
    }

    if (nextStep && currentStep.stepNumber >= nextStep.stepNumber) {
      throw new BadRequestException("Duplicate or non-sequential stepNumber");
    }
  }

  let upsertedJourneyWithSteps: journeyWithSteps | null;

  // Check if register or modify
  if (id === null) {
    upsertedJourneyWithSteps = await createJourney(journey, steps);
    if (!upsertedJourneyWithSteps)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const journeyToUpdate = await readJourney(id);
    if (!journeyToUpdate) throw new NotFoundException("Journey not found");

    upsertedJourneyWithSteps = await updateJourney(id, journey, steps);
    if (!upsertedJourneyWithSteps)
      throw new InternalServerErrorException("Internal server error");
  }

  return upsertedJourneyWithSteps;
};

/**
 * @params id: number
 * @returns Journey | null
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Deletes a journey by its id.
 */
export const removeJourney = async (id: number): Promise<Journey | null> => {
  const journey = await readJourney(id);
  if (!journey) throw new NotFoundException("Journey not found");

  const deletedJourney = await deleteJourney(id);

  if (!deletedJourney)
    throw new InternalServerErrorException("Internal server error");

  return deletedJourney;
};

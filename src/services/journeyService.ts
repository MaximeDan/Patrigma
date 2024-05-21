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
} from "../repositories/journeyRepository";
import { Journey, Step } from "@prisma/client";

// Return a journey without steps
export const getJourneyById = async (id: number): Promise<Journey | null> => {
  const journey: Journey | null = await readJourney(id);
  if (!journey) throw new NotFoundException("Journey not found");

  return journey;
};

// Return a journey with steps
export const getJourneyByIdWithSteps = async (
  id: number
): Promise<Journey | null> => {
  const journey: Journey | null = await readJourneyWithSteps(id);
  if (!journey) throw new NotFoundException("Journey not found");

  return journey;
};

// Return all journeys without steps
export const getAllJourneys = async (): Promise<Journey[]> => {
  const journeys = await readJourneys();

  if (journeys.length === 0) throw new NotFoundException("No journeys found");

  return journeys;
};

// Create or update a journey based on the id value in parameter
export const registerOrModifyJourney = async (
  id: number | null,
  journey: Journey,
  steps: Step[]
): Promise<Journey | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }
  if (!journey) throw new BadRequestException("Invalid journey");
  if (!steps) throw new BadRequestException("Invalid steps");

  let result: Journey | null;

  // Check if register or modify
  if (id === null) {
    result = await createJourney(journey, steps);
    if (!result)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const journeyToUpdate = await readJourney(id);
    if (!journeyToUpdate) throw new NotFoundException("Journey not found");

    result = await updateJourney(id, journey, steps);
    if (!result)
      throw new InternalServerErrorException("Internal server error");
  }

  return result;
};

export const removeJourney = async (id: number): Promise<Journey | null> => {
  const journey = await readJourney(id);
  if (!journey) throw new NotFoundException("Journey not found");

  const result = await deleteJourney(id);

  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

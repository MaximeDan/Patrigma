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
import { Journey } from "@prisma/client";
import {
  JourneyWithoutDates,
  JourneyWithComments,
  JourneyWithSteps,
  JourneyWithStepsAndComments,
} from "@/types/journey";
import { StepWithoutDates } from "@/types/step";

/**
 * @params id: number
 * @returns Journey | null
 * @throws NotFoundException
 * @description Retrieves a journey by its id without steps.
 */
export const getJourneyById = async (
  id: number,
): Promise<JourneyWithStepsAndComments | null> => {
  const journey: JourneyWithStepsAndComments | null = await readJourney(id);
  if (!journey) throw new NotFoundException("Journey not found");

  return journey;
};

/**
 * @params id: number
 * @returns JourneyWithSteps | null
 * @throws NotFoundException
 * @description Retrieves a journey by its id with its steps.
 */
export const getJourneyByIdWithSteps = async (
  id: number,
): Promise<JourneyWithSteps | null> => {
  const JourneyWithSteps: JourneyWithSteps | null =
    await readJourneyWithSteps(id);
  if (!JourneyWithSteps) throw new NotFoundException("Journey not found");

  return JourneyWithSteps;
};

/**
 * @params id: number
 * @returns JourneyWithComments | null
 * @throws NotFoundException
 * @description Retrieves a journey by its id with its comments.
 */
export const getJourneyByIdWithComments = async (
  id: number,
): Promise<JourneyWithComments | null> => {
  const JourneyWithComments: JourneyWithComments | null =
    await readJourneyWithComments(id);
  if (!JourneyWithComments) throw new NotFoundException("Journey not found");

  return JourneyWithComments;
};

/**
 * @returns JourneyWithStepsAndComments[]
 * @throws NotFoundException
 * @description Retrieves all journeys without steps.
 */
export const getAllJourneys = async (): Promise<
  JourneyWithStepsAndComments[]
> => {
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
  journey: JourneyWithoutDates,
  steps: StepWithoutDates[],
): Promise<Journey | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }
  if (!journey) throw new BadRequestException("Invalid journey");
  if (!steps) throw new BadRequestException("Invalid steps");

  let upsertedJourneyWithSteps: Journey | null;

  // Check if register or modify
  if (id === null) {
    steps = SortAndValidatetSteps(steps);

    upsertedJourneyWithSteps = await createJourney(journey, steps);
    if (!upsertedJourneyWithSteps)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const journeyToUpdate = await readJourneyWithSteps(id);
    if (!journeyToUpdate) throw new NotFoundException("Journey not found");

    // Récupère les étapes existantes du parcours
    const existingSteps = journeyToUpdate.steps;

    // Map pour associer chaque stepNumber à son étape existante
    const existingStepsMap = new Map<number, StepWithoutDates>(
      existingSteps.map((step) => [step.stepNumber, step]),
    );

    // Combinaison des étapes existantes avec celles fournies dans la requête
    for (const providedStep of steps) {
      existingStepsMap.set(providedStep.stepNumber, providedStep);
    }

    // Transformation du Map en tableau d'étapes
    const combinedSteps = Array.from(existingStepsMap.values());

    // Validation de l'unicité et séquentialité des stepNumbers
    const sortedAndValidatedSteps = SortAndValidatetSteps(combinedSteps);

    // Mise à jour du parcours avec les étapes combinées et validées
    upsertedJourneyWithSteps = await updateJourney(
      id,
      journey,
      sortedAndValidatedSteps,
    );

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

export const SortAndValidatetSteps = (
  steps: StepWithoutDates[],
): StepWithoutDates[] => {
  // Sort steps by stepNumber
  steps.sort((a, b) => a.stepNumber - b.stepNumber);

  // Check if stepNumbers are unique and sequential
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].stepNumber !== i + 1) {
      let errStr: String = "Sorted list Steps : ";
      for (const step of steps) {
        errStr += " id:" + step.id + "-stepNumber:" + step.stepNumber + " ||";
      }
      throw new BadRequestException("Invalid stepNumber sequence. " + errStr);
    }
  }

  return steps;
};

import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createStep,
  readStep,
  updateStep,
  deleteStep,
  readStepsByJourneyId,
} from "../repositories/stepRepository";
import { Step } from "@prisma/client";
import { readJourneyWithSteps } from "@/repositories/journeyRepository";
import { StepWithoutDates } from "@/types/step";

/**
 * @params journeyId: number
 * @returns Step[]
 * @throws NotFoundException
 * @description Retrieves all steps associated with a given journey ID.
 */
export const getStepsByJourneyID = async (
  journeyId: number
): Promise<Step[]> => {
  const steps = await readStepsByJourneyId(journeyId);

  if (!steps || steps.length === 0)
    throw new NotFoundException("Steps not found");

  return steps;
};

/**
 * @params id: number | null
 * @params step: StepWithoutDates
 * @returns Step | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Creates or updates a step based on the id value.
 */
export const registerOrModifyStep = async (
  id: number | null,
  step: StepWithoutDates
): Promise<Step | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }

  if (!step) throw new BadRequestException("Invalid step");

  const journey = await readJourneyWithSteps(step.journeyId);
  if (!journey) throw new NotFoundException("Journey not found");

  let upsertedStep: Step | null;

  if (id === null) {
    // Creating a new step
    await validateStepNumberForCreation(journey.steps, step);

    upsertedStep = await createStep(step);
    if (!upsertedStep) {
      throw new InternalServerErrorException("Internal server error");
    }
  } else {
    // Updating an existing step
    const stepToUpdate = journey.steps.find((s) => s.id === id);

    if (!stepToUpdate) throw new NotFoundException("Step not found");

    // Check if stepNumber is being modified
    if (step.stepNumber !== stepToUpdate.stepNumber) {
      throw new BadRequestException(
        "Modification of stepNumber is not allowed."
      );
    }

    // Proceed with the update if stepNumber is not modified
    upsertedStep = await updateStep(id, step);
    if (!upsertedStep) {
      throw new InternalServerErrorException("Internal server error");
    }
  }

  return upsertedStep;
};
/**
 * @params id: number
 * @returns Step | null
 * @throws NotFoundException
 * @description Retrieves a step by its id.
 */
export const getStepById = async (id: number): Promise<Step | null> => {
  const step = await readStep(id);
  if (!step) throw new NotFoundException("Step not found");

  return step;
};

/**
 * @params id: number
 * @returns Step | null
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Deletes a step by its id and updates subsequent steps' numbers.
 */
export const removeStep = async (id: number): Promise<Step | null> => {
  const step = await readStep(id);
  if (!step) throw new NotFoundException("Step not found");

  const journey = await readJourneyWithSteps(step.journeyId);
  if (!journey)
    throw new NotFoundException("Journey not found for the given step");

  const deletedStep = await deleteStep(id);
  if (!deletedStep)
    throw new InternalServerErrorException("Internal server error");

  // Update step numbers of subsequent steps
  if (journey) {
    const stepsToUpdate = journey.steps
      .filter((s: Step) => s.stepNumber > step.stepNumber)
      .sort((a: Step, b: Step) => a.stepNumber - b.stepNumber); // Sort stepsToUpdate in ascending order based on stepNumber
    for (const s of stepsToUpdate) {
      s.stepNumber -= 1;
      const updatedStep = await updateStep(s.id, s);
      if (!updatedStep)
        throw new InternalServerErrorException("Internal server error");
    }
  }

  return deletedStep;
};

async function validateStepNumberForCreation(
  steps: Step[],
  newStep: StepWithoutDates
) {
  const stepCount = steps.length;

  if (stepCount === 0 && newStep.stepNumber !== 1) {
    throw new BadRequestException("The first step must have step number 1.");
  }

  if (stepCount > 0) {
    const lastStep = steps[stepCount - 1];
    if (newStep.stepNumber !== lastStep.stepNumber + 1) {
      throw new BadRequestException(
        `Invalid step number. Must be sequential. Previous step number: ${lastStep.stepNumber}`
      );
    }
  }
}

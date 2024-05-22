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

export const getStepsByJourneyID = async (
  journeyId: number
): Promise<Step[]> => {
  const steps = await readStepsByJourneyId(journeyId);

  if (!steps || steps.length === 0)
    throw new NotFoundException("Steps not found");

  return steps;
};

// Create or update a step
export const registerOrModifyStep = async (
  id: number | null,
  step: Step
): Promise<Step | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }

  if (!step) throw new BadRequestException("Invalid step");

  // Check if journey exists and stepNumber is unique
  const journey = await readJourneyWithSteps(step.journeyId);

  if (!journey) throw new NotFoundException("Journey not found");

  // Check if stepNumber is unique and sequential
  const lastStep = journey.steps[journey.steps.length - 1];
  if (lastStep && step.stepNumber !== lastStep.stepNumber + 1) {
    throw new BadRequestException("Invalid step number");
  }

  let upsertedStep: Step | null;

  // Check if register or modify
  if (id === null) {
    upsertedStep = await createStep(step);
    if (!upsertedStep)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const stepToUpdate = await readStep(id);
    if (!stepToUpdate) throw new NotFoundException("Step not found");

    upsertedStep = await updateStep(id, step);
    if (!upsertedStep)
      throw new InternalServerErrorException("Internal server error");
  }

  return upsertedStep;
};

export const getStepById = async (id: number): Promise<Step | null> => {
  const step = await readStep(id);
  if (!step) throw new NotFoundException("Step not found");

  return step;
};

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
      .filter((s) => s.stepNumber > step.stepNumber)
      .sort((a, b) => a.stepNumber - b.stepNumber); // Sort stepsToUpdate in ascending order based on stepNumber
    for (const s of stepsToUpdate) {
      s.stepNumber -= 1;
      const updatedStep = await updateStep(s.id, s);
      if (!updatedStep)
        throw new InternalServerErrorException("Internal server error");
    }
  }

  return deletedStep;
};

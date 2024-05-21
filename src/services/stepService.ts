import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createStep,
  readStep,
  readSteps,
  updateStep,
  deleteStep,
} from "../repositories/stepRepository";
import { Step } from "@prisma/client";
import {
  readJourney,
  readJourneyWithSteps,
} from "@/repositories/journeyRepository";

// Create or update a step based on the id value in parameter
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

  if (journey.steps.find((s) => s.stepNumber === step.stepNumber))
    throw new BadRequestException("Step number already exists");

  let result: Step | null;

  // Check if register or modify
  if (id === null) {
    result = await createStep(step);
    if (!result)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const stepToUpdate = await readStep(id);
    if (!stepToUpdate) throw new NotFoundException("Step not found");

    result = await updateStep(id, step);
    if (!result)
      throw new InternalServerErrorException("Internal server error");
  }

  return result;
};

export const getStepById = async (id: number): Promise<Step | null> => {
  const step = await readStep(id);
  if (!step) throw new NotFoundException("Step not found");

  return step;
};

export const getAllSteps = async (): Promise<Step[]> => {
  const steps = await readSteps();
  if (steps.length === 0) throw new NotFoundException("No steps found");

  return steps;
};

export const removeStep = async (id: number): Promise<Step | null> => {
  const step = await readStep(id);
  if (!step) throw new NotFoundException("Step not found");

  const result = await deleteStep(id);
  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

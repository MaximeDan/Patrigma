import prisma from "@/lib/prisma";
import { Step } from "@prisma/client";

/**
 * @params data: Step
 * @returns Step
 * @description Creates a new step with the provided data.
 */
export const createStep = async (data: Step): Promise<Step> => {
  return await prisma.step.create({
    data,
  });
};

/**
 * @params id: number
 * @returns Step | null
 * @description Retrieves a step by its id.
 */
export const readStep = async (id: number): Promise<Step | null> => {
  return await prisma.step.findUnique({ where: { id } });
};

/**
 * @params journeyId: number
 * @returns Step[] | null
 * @description Retrieves all steps associated with a given journey ID.
 */
export const readStepsByJourneyId = async (
  journeyId: number
): Promise<Step[] | null> => {
  return await prisma.step.findMany({ where: { journeyId } });
};

/**
 * @params id: number
 * @params data: Step
 * @returns Step | null
 * @description Updates a step with the provided data.
 */
export const updateStep = async (
  id: number,
  data: Step
): Promise<Step | null> => {
  return await prisma.step.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns Step | null
 * @description Deletes a step by its id.
 */
export const deleteStep = async (id: number): Promise<Step | null> => {
  return await prisma.step.delete({ where: { id } });
};

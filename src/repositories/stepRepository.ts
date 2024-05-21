import prisma from "@/lib/prisma";
import { Step } from "@prisma/client";

export const createStep = async (data: Step): Promise<Step> => {
  return await prisma.step.create({
    data,
  });
};

export const readStep = async (id: number): Promise<Step | null> => {
  return await prisma.step.findUnique({ where: { id } });
};

export const readSteps = async (): Promise<Step[]> => {
  return await prisma.step.findMany();
};

export const readStepsByJourneyId = async (
  journeyId: number
): Promise<Step[] | null> => {
  return await prisma.step.findMany({ where: { journeyId } });
};

export const updateStep = async (
  id: number,
  data: Step
): Promise<Step | null> => {
  return await prisma.step.update({
    where: { id },
    data,
  });
};

export const deleteStep = async (id: number): Promise<Step | null> => {
  return await prisma.step.delete({ where: { id } });
};

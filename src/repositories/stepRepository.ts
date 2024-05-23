import prisma from "@/lib/prisma";
import { Step } from "@prisma/client";

export const createStep = async (data: Step): Promise<Step> => {
  return await prisma.step.create({
    data,
  });
};

export const getStep = async (id: number): Promise<Step | null> => {
  return await prisma.step.findUnique({ where: { id } });
};

export const getSteps = async (): Promise<Step[]> => {
  return await prisma.step.findMany();
};

export const updateStep = async (
  id: number,
  data: Step,
): Promise<Step | null> => {
  return await prisma.step.update({
    where: { id },
    data,
  });
};

export const deleteStep = async (id: number): Promise<Step | null> => {
  return await prisma.step.delete({ where: { id } });
};

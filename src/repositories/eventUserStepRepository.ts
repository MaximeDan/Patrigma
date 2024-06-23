import prisma from "@/lib/prisma";
import { EventUserStepWithoutId } from "@/types/eventUserStep";
import { EventUserStep } from "@prisma/client";

/**
 * @params data: EventUserStepWithoutId
 * @returns EventUserStep
 * @description Creates a new user step event with the provided data.
 */
export const createEventUserStep = async (
  data: EventUserStepWithoutId
): Promise<EventUserStep> => {
  return await prisma.eventUserStep.create({
    data,
  });
};

/**
 * @params id: number
 * @returns EventUserStep | null
 * @description Retrieves a user step event by its id.
 */
export const readEventUserStep = async (
  id: number
): Promise<EventUserStep | null> => {
  return await prisma.eventUserStep.findUnique({ where: { id } });
};

/**
 * @params userId: number
 * @params eventId: number
 * @params stepId: number
 * @returns EventUserStep | null
 * @description Retrieves a user step event by user id, event id, and step id.
 */
export const readEventUserStepByIds = async (
  userId: number,
  eventId: number,
  stepId: number
): Promise<EventUserStep | null> => {
  return await prisma.eventUserStep.findFirst({
    where: { userId, eventId, stepId },
  });
};

/**
 * @returns EventUserStep[]
 * @description Retrieves all user step events.
 */
export const readEventUserSteps = async (): Promise<EventUserStep[]> => {
  return await prisma.eventUserStep.findMany();
};

/**
 * @params userId: number
 * @params eventId: number
 * @returns EventUserStep[]
 * @description Retrieves all user step events for a given user and event.
 */
export const readEventUserStepsByUserIdAndEventId = async (
  userId: number,
  eventId: number
): Promise<EventUserStep[]> => {
  return await prisma.eventUserStep.findMany({
    where: { userId, eventId },
  });
};

/**
 * @params id: number
 * @params data: EventUserStep
 * @returns EventUserStep | null
 * @description Updates a user step event with the provided data.
 */
export const updateEventUserStep = async (
  id: number,
  data: EventUserStep
): Promise<EventUserStep | null> => {
  return await prisma.eventUserStep.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns EventUserStep | null
 * @description Deletes a user step event by its id.
 */
export const deleteEventUserStep = async (
  id: number
): Promise<EventUserStep | null> => {
  return await prisma.eventUserStep.delete({ where: { id } });
};

import prisma from "@/lib/prisma";
import { UserEventWithoutId } from "@/types/userEventNullableId";
import { UserEvent } from "@prisma/client";

/**
 * @params data: UserEventWithoutId
 * @returns UserEvent
 * @description Creates a new user event with the provided data.
 */
export const createUserEvent = async (
  data: UserEventWithoutId
): Promise<UserEvent> => {
  return await prisma.userEvent.create({
    data,
  });
};

/**
 * @params id: number
 * @returns UserEvent | null
 * @description Retrieves a user event by its id.
 */
export const readUserEvent = async (id: number): Promise<UserEvent | null> => {
  return await prisma.userEvent.findUnique({ where: { id } });
};

/**
 * @params userId: number
 * @params eventId: number
 * @returns UserEvent | null
 * @description Retrieves a user event by user id and event id.
 */
export const readUserEventByUserIdAndEventId = async (
  userId: number,
  eventId: number
): Promise<UserEvent | null> => {
  return await prisma.userEvent.findFirst({
    where: { userId, eventId },
  });
};

/**
 * @returns UserEvent[]
 * @description Retrieves all user events.
 */
export const readUserEvents = async (): Promise<UserEvent[]> => {
  return await prisma.userEvent.findMany();
};

/**
 * @params id: number
 * @params data: UserEvent
 * @returns UserEvent | null
 * @description Updates a user event with the provided data.
 */
export const updateUserEvent = async (
  id: number,
  data: UserEvent
): Promise<UserEvent | null> => {
  return await prisma.userEvent.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns UserEvent | null
 * @description Deletes a user event by its id.
 */
export const deleteUserEvent = async (
  id: number
): Promise<UserEvent | null> => {
  return await prisma.userEvent.delete({ where: { id } });
};

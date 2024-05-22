import prisma from "@/lib/prisma";
import { UserEventWithoutId } from "@/types/userEventNullableId";
import { UserEvent } from "@prisma/client";

export const createUserEvent = async (
  data: UserEventWithoutId
): Promise<UserEvent> => {
  return await prisma.userEvent.create({
    data,
  });
};

export const readUserEvent = async (id: number): Promise<UserEvent | null> => {
  return await prisma.userEvent.findUnique({ where: { id } });
};

export const readUserEventByUserIdAndEventId = async (
  userId: number,
  eventId: number
): Promise<UserEvent | null> => {
  return await prisma.userEvent.findFirst({
    where: { userId, eventId },
  });
};

export const readUserEvents = async (): Promise<UserEvent[]> => {
  return await prisma.userEvent.findMany();
};

export const updateUserEvent = async (
  id: number,
  data: UserEvent
): Promise<UserEvent | null> => {
  return await prisma.userEvent.update({
    where: { id },
    data,
  });
};

export const deleteUserEvent = async (
  id: number
): Promise<UserEvent | null> => {
  return await prisma.userEvent.delete({ where: { id } });
};

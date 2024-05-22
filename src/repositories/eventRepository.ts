import prisma from "@/lib/prisma";
import { eventWithUserEvents } from "@/types/eventWithUserEvents";
import { Event } from "@prisma/client";

export const createEvent = async (data: Event): Promise<Event> => {
  return await prisma.event.create({
    data,
  });
};

export const readEvent = async (
  id: number
): Promise<eventWithUserEvents | null> => {
  return await prisma.event.findUnique({
    where: { id },
    include: {
      userEvents: {},
    },
  });
};

export const readEvents = async (): Promise<Event[] | null> => {
  return await prisma.event.findMany();
};

export const updateEvent = async (
  id: number,
  data: Event
): Promise<Event | null> => {
  return await prisma.event.update({
    where: { id },
    data,
  });
};

export const deleteEvent = async (id: number): Promise<Event | null> => {
  return await prisma.event.delete({ where: { id } });
};

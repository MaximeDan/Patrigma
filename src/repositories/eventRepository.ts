import prisma from "@/lib/prisma";
import { EventWithUserEvents, EventRequestBody } from "@/types/event";
import { Event } from "@prisma/client";

/**
 * @params data: Event
 * @returns Event
 * @description Creates a new event with the provided data.
 */
export const createEvent = async (data: EventRequestBody): Promise<Event> => {
  return await prisma.event.create({
    data,
  });
};

/**
 * @params id: number
 * @returns EventWithUserEvents | null
 * @description Retrieves an event by its id along with associated user events.
 */
export const readEvent = async (
  id: number,
): Promise<EventWithUserEvents | null> => {
  return await prisma.event.findUnique({
    where: { id },
    include: {
      userEvents: {},
    },
  });
};

/**
 * @returns Event[] | null
 * @description Retrieves all events.
 */
export const readEvents = async (): Promise<Event[] | null> => {
  return await prisma.event.findMany();
};

/**
 * @params id: number
 * @params data: Event
 * @returns Event | null
 * @description Updates an event with the provided data.
 */
export const updateEvent = async (
  id: number,
  data: EventRequestBody,
): Promise<Event | null> => {
  return await prisma.event.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns Event | null
 * @description Deletes an event by its id.
 */
export const deleteEvent = async (id: number): Promise<Event | null> => {
  return await prisma.event.delete({ where: { id } });
};

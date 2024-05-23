import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";

export const createEvent = async (data: Event): Promise<Event> => {
  return await prisma.event.create({
    data,
  });
};

export const getEvent = async (id: number): Promise<Event | null> => {
  return await prisma.event.findUnique({ where: { id } });
};

export const getEvents = async (): Promise<Event[]> => {
  return await prisma.event.findMany();
};

export const updateEvent = async (
  id: number,
  data: Event,
): Promise<Event | null> => {
  return await prisma.event.update({
    where: { id },
    data,
  });
};

export const deleteEvent = async (id: number): Promise<Event | null> => {
  return await prisma.event.delete({ where: { id } });
};

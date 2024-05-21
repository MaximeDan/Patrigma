import {
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createEvent,
  readEvent,
  readEvents,
  updateEvent,
  deleteEvent,
} from "../repositories/eventRepository";
import {
  createUserEvent,
  readUserEvent,
  updateUserEvent,
} from "../repositories/userEventRepository";
import { Event, UserEvent } from "@prisma/client";

export const registerEvent = async (eventData: Event): Promise<Event> => {
  const result = await createEvent(eventData);

  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

export const getEventById = async (id: number): Promise<Event | null> => {
  const event = await readEvent(id);

  if (!event) throw new NotFoundException("Event not found");

  return event;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const events = await readEvents();

  if (events.length === 0) throw new NotFoundException("No events found");

  return events;
};

export const modifyEvent = async (
  id: number,
  eventData: Event
): Promise<Event | null> => {
  const event = await readEvent(id);

  if (!event) throw new NotFoundException("Event not found");

  const result = await updateEvent(id, eventData);

  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

export const removeEvent = async (id: number): Promise<Event | null> => {
  const event = await readEvent(id);

  if (!event) throw new NotFoundException("Event not found");

  const result = await deleteEvent(id);

  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

export const joinEvent = async (
  userId: number,
  eventId: number
): Promise<UserEvent> => {
  const event = await readEvent(eventId);

  if (!event) throw new NotFoundException("Event not found");

  const userEventData: UserEvent = {
    userId: userId,
    eventId: eventId,
    lastStepId: null,
    id: 0,
  };

  const result = await createUserEvent(userEventData);

  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

export const updateLastStepId = async (
  userEventId: number,
  lastStepId: number
): Promise<UserEvent | null> => {
  const userEvent = await readUserEvent(userEventId);

  if (!userEvent) throw new NotFoundException("UserEvent not found");

  userEvent.lastStepId = lastStepId;

  const result = await updateUserEvent(userEventId, userEvent);

  if (!result) throw new InternalServerErrorException("Internal server error");

  return result;
};

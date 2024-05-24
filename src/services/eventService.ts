import {
  BadRequestException,
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
import { Event, UserEvent } from "@prisma/client";
import {
  createUserEvent,
  deleteUserEvent,
  readUserEventByUserIdAndEventId,
} from "@/repositories/userEventRepository";
import { eventWithUserEvents, eventWithoutId } from "@/types/event";
import { UserEventWithoutId } from "@/types/userEventWithoutId";

/**
 * @params id: number
 * @returns eventWithUserEvents | null
 * @throws NotFoundException
 * @description Retrieves an event with its associated user events by its id.
 */
export const getEventByIdWithUserEvents = async (
  id: number
): Promise<eventWithUserEvents | null> => {
  const eventWithUserEvents: eventWithUserEvents | null = await readEvent(id);
  if (!eventWithUserEvents) throw new NotFoundException("Event not found");

  return eventWithUserEvents;
};

/**
 * @returns Event[] | null
 * @throws NotFoundException
 * @description Retrieves all events without details.
 */
export const getAllEvents = async (): Promise<Event[] | null> => {
  const events = await readEvents();

  if (!events || events.length === 0)
    throw new NotFoundException("No events found");

  return events;
};

/**
 * @params id: number | null
 * @params event: Event
 * @returns Event | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Creates or updates an event based on the id value.
 */
export const registerOrModifyEvent = async (
  id: number | null,
  event: eventWithoutId
): Promise<Event | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }
  if (!event) throw new BadRequestException("Invalid event");

  let upsertedEvent: Event | null;

  // Check if register or modify
  if (id === null) {
    upsertedEvent = await createEvent(event);
    if (!upsertedEvent)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const eventToUpdate = await readEvent(id);
    if (!eventToUpdate) throw new NotFoundException("Event not found");

    upsertedEvent = await updateEvent(id, event);
    if (!upsertedEvent)
      throw new InternalServerErrorException("Internal server error");
  }

  return upsertedEvent;
};

/**
 * @params id: number
 * @returns Event | null
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Deletes an event by its id.
 */
export const removeEvent = async (id: number): Promise<Event | null> => {
  const event = await readEvent(id);
  if (!event) throw new NotFoundException("Event not found");

  const deletedEvent = await deleteEvent(id);

  if (!deletedEvent)
    throw new InternalServerErrorException("Internal server error");

  return deletedEvent;
};

/**
 * @params eventId: number
 * @params userId: number
 * @returns UserEvent | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Allows a user to join an event.
 */
export const joinEvent = async (
  eventId: number,
  userId: number
): Promise<UserEvent | null> => {
  // Validate arguments
  if (!Number.isFinite(userId) || !Number.isFinite(eventId)) {
    throw new BadRequestException("Invalid userId or eventId");
  }

  if (await readUserEventByUserIdAndEventId(userId, eventId)) {
    throw new NotFoundException("User already joined event");
  }

  const userEvent: UserEventWithoutId = { userId: userId, eventId: eventId };
  const createdUserEvent = await createUserEvent(userEvent);

  if (!createdUserEvent) {
    throw new InternalServerErrorException("Unable to join event");
  }

  return createdUserEvent;
};

/**
 * @params userId: number
 * @params eventId: number
 * @returns UserEvent | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Allows a user to leave an event.
 */
export const leaveEvent = async (
  userId: number,
  eventId: number
): Promise<UserEvent | null> => {
  // Validate arguments
  if (!Number.isFinite(userId) || !Number.isFinite(eventId)) {
    throw new BadRequestException("Invalid userId or eventId");
  }

  const userEvent = await readUserEventByUserIdAndEventId(userId, eventId);
  if (!userEvent) {
    throw new NotFoundException("User not found in event");
  }

  // Delete the UserEvent
  const deletedUserEvent = await deleteUserEvent(userEvent.id);

  if (!deletedUserEvent) {
    throw new InternalServerErrorException("Unable to leave event");
  }

  return deletedUserEvent;
};

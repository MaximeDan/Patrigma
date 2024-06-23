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
import { Event, UserEvent, EventUserStep } from "@prisma/client";
import {
  createUserEvent,
  deleteUserEvent,
  readUserEventByUserIdAndEventId,
} from "@/repositories/userEventRepository";
import { EventWithUserEvents, EventWithoutId } from "@/types/event";
import { readUser } from "@/repositories/userRepository";
import { UserEventWithoutId } from "@/types/userEvent";
import { readJourneyWithSteps } from "@/repositories/journeyRepository";
import { JourneyWithSteps } from "@/types/journey";
import { EventUserStepWithoutId } from "@/types/eventUserStep";
import {
  createEventUserStep,
  readEventUserStepByIds,
  readEventUserStepsByUserIdAndEventId,
  updateEventUserStep,
} from "@/repositories/eventUserStepRepository";

/**
 * @params id: number
 * @returns EventWithUserEvents | null
 * @throws NotFoundException
 * @description Retrieves an event with its associated user events by its id.
 */
export const getEventByIdWithUserEvents = async (
  id: number
): Promise<EventWithUserEvents | null> => {
  const EventWithUserEvents: EventWithUserEvents | null = await readEvent(id);
  if (!EventWithUserEvents) throw new NotFoundException("Event not found");

  return EventWithUserEvents;
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
  event: EventWithoutId
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
  if (!Number.isFinite(userId) || !Number.isFinite(eventId))
    throw new BadRequestException("Invalid userId or eventId");

  if (!(await readUser(userId))) throw new NotFoundException("User not found");

  if (!(await readEvent(eventId)))
    throw new NotFoundException("Event not found");

  if (await readUserEventByUserIdAndEventId(userId, eventId))
    throw new BadRequestException("User already joined event");

  const userEvent: UserEventWithoutId = { userId: userId, eventId: eventId };
  const createdUserEvent = await createUserEvent(userEvent);

  if (!createdUserEvent)
    throw new InternalServerErrorException("Unable to join event");

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
  eventId: number,
  userId: number
): Promise<UserEvent | null> => {
  // Validate arguments
  if (!Number.isFinite(userId) || !Number.isFinite(eventId)) {
    throw new BadRequestException("Invalid userId or eventId");
  }

  const userEvent = await readUserEventByUserIdAndEventId(userId, eventId);
  if (!userEvent) throw new NotFoundException("UserEvent not found");

  // Delete the UserEvent
  const deletedUserEvent = await deleteUserEvent(userEvent.id);

  if (!deletedUserEvent)
    throw new InternalServerErrorException("Unable to leave event");

  return deletedUserEvent;
};

/**
 * @params userId: number
 * @params eventId: number
 * @params stepId: number
 * @returns EventUserStep | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Register a EventUserStep that allow to track the user completion of the event
 */
export const registerEventUserStep = async (
  userId: number,
  eventId: number,
  stepId: number
): Promise<EventUserStep | null> => {
  if (
    !Number.isFinite(userId) ||
    !Number.isFinite(eventId) ||
    !Number.isFinite(stepId)
  )
    throw new BadRequestException("Invalid userId, eventId, or stepId");

  if (!(await readUser(userId))) throw new NotFoundException("User not found");

  const event = await readEvent(eventId);
  if (!event) throw new NotFoundException("Event not found");

  const journey: JourneyWithSteps | null = await readJourneyWithSteps(
    event.journeyId
  );

  if (!journey || !journey.steps.some((step) => step.id === stepId))
    throw new BadRequestException(
      "Invalid stepId for the given event's journey"
    );

  const currentStep = journey.steps.find((step) => step.id === stepId);
  if (!currentStep)
    throw new BadRequestException("Invalid stepId for the journey");

  if (currentStep.stepNumber !== 1) {
    // Check if the previous step is completed
    const previousStep = journey.steps.find(
      (step) => step.stepNumber === currentStep.stepNumber - 1
    );
    if (!previousStep)
      throw new InternalServerErrorException("Internal server error");

    const previousEventUserStep = await readEventUserStepByIds(
      userId,
      eventId,
      previousStep.id
    );
    if (!previousEventUserStep || previousEventUserStep.endAt === null) {
      throw new BadRequestException(
        "Previous step is not completed, cannot proceed to the next step"
      );
    }
  }

  if (await readEventUserStepByIds(userId, eventId, stepId))
    throw new BadRequestException("User step event already exists");

  const EventUserStepData: EventUserStepWithoutId = {
    userId,
    eventId,
    stepId,
    startAt: new Date(), // Set by the service
    endAt: null, // Intentionally set to null. Will be updated by completeEventUserStep function
    durationMs: 0, // completeEventUserStep will calculate the duration
  };

  const EventUserStep = await createEventUserStep(EventUserStepData);

  if (!EventUserStep)
    throw new InternalServerErrorException("Internal server error");

  return EventUserStep;
};

/**
 * @params userId: number
 * @params eventId: number
 * @params stepId: number
 * @returns EventUserStep | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Marks a step as completed for a user in a specific event, updating endAt and duration.
 */
export const completeEventUserStep = async (
  userId: number,
  eventId: number,
  stepId: number
): Promise<EventUserStep | null> => {
  // Validate arguments
  if (
    !Number.isFinite(userId) ||
    !Number.isFinite(eventId) ||
    !Number.isFinite(stepId)
  ) {
    throw new BadRequestException("Invalid userId, eventId, or stepId");
  }

  // Check if the EventUserStep exists
  const eventUserStep = await readEventUserStepByIds(userId, eventId, stepId);
  if (!eventUserStep) throw new NotFoundException("EventUserStep not found");

  if (eventUserStep.endAt !== null)
    throw new BadRequestException("EventUserStep already completed");

  // Set endAt to the current date and time
  eventUserStep.endAt = new Date();

  // Calculate the duration in milliseconds
  eventUserStep.durationMs =
    eventUserStep.endAt.getTime() - new Date(eventUserStep.startAt).getTime();

  // Update the EventUserStep with endAt and duration
  const updatedEventUserStep = await updateEventUserStep(
    eventUserStep.id,
    eventUserStep
  );

  if (!updatedEventUserStep) {
    throw new InternalServerErrorException(
      "Unable to complete user step event"
    );
  }

  return updatedEventUserStep;
};

/**
 * @params userId: number
 * @params eventId: number
 * @returns EventUserStep[]
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Retrieves all user step events for a given user and event.
 */
export const getEventUserStepsByUserIdAndEventId = async (
  userId: number,
  eventId: number
): Promise<EventUserStep[]> => {
  // Validate arguments
  if (!Number.isFinite(userId) || !Number.isFinite(eventId)) {
    throw new BadRequestException("Invalid userId or eventId");
  }

  if (!(await readUser(userId))) {
    throw new NotFoundException("User not found");
  }

  if (!(await readEvent(eventId))) {
    throw new NotFoundException("Event not found");
  }

  const EventUserSteps = await readEventUserStepsByUserIdAndEventId(
    userId,
    eventId
  );

  if (!EventUserSteps || EventUserSteps.length === 0) {
    throw new NotFoundException(
      "EventUserSteps not found for the given user and event"
    );
  }

  return EventUserSteps;
};

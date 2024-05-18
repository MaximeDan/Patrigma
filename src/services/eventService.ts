import { createEvent, getEvent, getEvents, updateEvent, deleteEvent } from '../repositories/eventRepository';
import { createUserEvent } from '../repositories/userEventRepository';
import { Event, UserEvent } from '@prisma/client';

export const registerEvent = async (eventData: Event): Promise<Event> => {
    return await createEvent(eventData);
};

export const joinEvent = async (userId: number, eventId: number): Promise<UserEvent> => {
    // Register the user for the event
    const userEventData: UserEvent = {
        id: 0,
        userId: userId,
        eventId: eventId,
        lastStepId: null
    };
    return await createUserEvent(userEventData);
};

export const getEventById = async (id: number): Promise<Event | null> => {
    const event = await getEvent(id);
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

export const getAllEvents = async (): Promise<Event[]> => {
    return await getEvents();
};

export const modifyEvent = async (id: number, eventData: Event): Promise<Event | null> => {
    const event = await getEvent(id);
    if (!event) {
        throw new Error('Event not found');
    }
    return await updateEvent(id, eventData);
};

export const removeEvent = async (id: number): Promise<Event | null> => {
    const event = await getEvent(id);
    if (!event) {
        throw new Error('Event not found');
    }
    return await deleteEvent(id);
};

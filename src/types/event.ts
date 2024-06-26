import { Prisma, Event } from "@prisma/client";

export type EventWithUserEvents = Prisma.EventGetPayload<{
  include: { userEvents: true };
}>;

export type EventRequestBody = Omit<Event, "id" | "createdAt" | "updatedAt">;

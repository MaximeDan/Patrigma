import { Prisma } from "@prisma/client";

export type eventWithUserEvents = Prisma.EventGetPayload<{
  include: { userEvents: true };
}>;

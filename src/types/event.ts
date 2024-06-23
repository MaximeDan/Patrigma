import { Prisma } from "@prisma/client";

export type EventWithUserEvents = Prisma.EventGetPayload<{
  include: { userEvents: true };
}>;

export type EventWithoutId = {
  authorId: number;
  journeyId: number;
  title: string;
  image: string;
  numberPlayerMin: number;
  numberPlayerMax: number;
  description: string;
  startAt: Date;
  endAt: Date;
  isPrivate?: boolean;
  accessCode?: string;
};

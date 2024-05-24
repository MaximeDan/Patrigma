import { Prisma } from "@prisma/client";

export type journeyWithComments = Prisma.JourneyGetPayload<{
  include: { comments: true };
}>;

export type journeyWithSteps = Prisma.JourneyGetPayload<{
  include: { steps: true };
}>;

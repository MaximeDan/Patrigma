import { Prisma } from "@prisma/client";

export type journeyWithSteps = Prisma.JourneyGetPayload<{
  include: { steps: true };
}>;

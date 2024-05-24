import {
  handleException,
  handlePrismaException,
} from "@/app/utils/errorHandlerUtils";
import {
  getAllJourneys,
  registerOrModifyJourney,
} from "@/services/journeyService";
import { Journey, Step, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @returns NextResponse
 * @description Handles GET request to retrieve all journeys.
 */
export async function GET() {
  try {
    const result = await getAllJourneys();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to create a new journey.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const journey: Journey = body.journey;
    const steps: Step[] = body.steps;

    const result = await registerOrModifyJourney(null, journey, steps);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientRustPanicError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      return handlePrismaException(error);
    }
    return handleException(error);
  }
}

import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getAllJourneys,
  registerOrModifyJourney,
} from "@/services/journeyService";
import { BadRequestException } from "@/types/exceptions";
import { JourneyWithoutDates } from "@/types/journey";
import { StepWithoutDates } from "@/types/step";
import { journeyBodySchema } from "@/validators/api/journeySchema";
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
    // Parse the body with zod to get the journey and steps
    const parsedBody = journeyBodySchema.safeParse(body);
    if (parsedBody.error) {
      throw new BadRequestException("Invalid request body");
    }
    const journey: JourneyWithoutDates = body.journey;
    const steps: StepWithoutDates[] = body.steps;

    const result = await registerOrModifyJourney(null, journey, steps);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

import { handleException } from "@/utils/errorHandlerUtils";
import {
  getJourneyById,
  registerOrModifyJourney,
  removeJourney,
} from "@/services/journeyService";
import { JourneyWithoutDates } from "@/types/journey";
import { StepWithoutDates } from "@/types/step";
import { journeyBodySchema } from "@/validators/api/journeySchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles PUT request to update a journey by its id.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id: number = Number(params.id);
    const body = await request.json();
    // Parse the body with zod to get the journey and steps
    const parsedBody = journeyBodySchema.parse(body);
    const journey: JourneyWithoutDates = parsedBody.journey;
    const steps: StepWithoutDates[] = parsedBody.steps;

    const result = await registerOrModifyJourney(id, journey, steps);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns Response
 * @description Handles DELETE request to delete a journey by its id.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id: number = Number(params.id);

  try {
    await removeJourney(id);

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve a journey by its id with its comments and its steps.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id: number = Number(params.id);
    const result = await getJourneyById(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

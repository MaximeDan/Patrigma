import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getJourneyByIdWithSteps,
  registerOrModifyJourney,
  removeJourney,
} from "@/services/journeyService";
import { InternalServerErrorException } from "@/types/exceptions";
import { Journey, Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/journeys/[id] : get a journey by id with associated steps
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const result = await getJourneyByIdWithSteps(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// PUT /api/journeys/[id] : update a journey by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const body = await request.json();
    const journey: Journey = body.journey;
    const steps: Step[] = body.steps;

    const result = await registerOrModifyJourney(id, journey, steps);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// DELETE /api/journeys/[id] : delete a journey by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id: number = Number(params.id);

  try {
    const result = await removeJourney(id);

    if (!result)
      throw new InternalServerErrorException("Internal server error");

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

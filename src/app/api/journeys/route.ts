import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getAllJourneys,
  registerOrModifyJourney,
} from "@/services/journeyService";
import { Journey, Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/journeys : get all journeys
export async function GET() {
  try {
    const result = await getAllJourneys();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// POST /api/journeys : create a new journey
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const journey: Journey = body.journey;
    const steps: Step[] = body.steps;

    const result = await registerOrModifyJourney(null, journey, steps);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

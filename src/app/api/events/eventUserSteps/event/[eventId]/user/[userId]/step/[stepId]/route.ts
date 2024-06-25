import { handleException } from "@/utils/errorHandlerUtils";
import {
  completeEventUserStep,
  registerEventUserStep,
} from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { params: { eventId: string; userId: string; stepId: string } }
 * @returns NextResponse
 * @description Handles POST request to create a new EventUserStep.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { eventId: string; userId: string; stepId: string } },
) {
  try {
    const eventId: number = Number(params.eventId);
    const userId: number = Number(params.userId);
    const stepId: number = Number(params.stepId);

    const result = await registerEventUserStep(userId, eventId, stepId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { eventId: string; userId: string; stepId: string }
 * @returns NextResponse
 * @description Handles PUT request to mark a step as completed for a user in a specific event.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { eventId: string; userId: string; stepId: string } },
) {
  try {
    const eventId: number = Number(params.eventId);
    const userId: number = Number(params.userId);
    const stepId: number = Number(params.stepId);

    const result = await completeEventUserStep(userId, eventId, stepId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

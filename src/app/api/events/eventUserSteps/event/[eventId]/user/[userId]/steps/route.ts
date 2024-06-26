import { handleException } from "@/utils/errorHandlerUtils";
import { getEventUserStepsByUserIdAndEventId } from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { eventId: string; userId: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve all EventUserSteps for a user in a specific event.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string; userId: string } },
) {
  try {
    const eventId: number = Number(params.eventId);
    const userId: number = Number(params.userId);

    const result = await getEventUserStepsByUserIdAndEventId(userId, eventId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

import { handleException } from "@/utils/errorHandlerUtils";
import { joinEvent } from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string; userId: string }
 * @returns NextResponse
 * @description Handles POST request to join an event.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } },
) {
  try {
    const eventId: number = Number(params.id);
    const userId: number = Number(params.userId);

    const result = await joinEvent(eventId, userId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

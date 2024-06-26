import { handleException } from "@/utils/errorHandlerUtils";
import { leaveEvent } from "@/services/eventService";
import { NextRequest } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string; userId: string }
 * @returns Response
 * @description Handles DELETE request to leave an event.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } },
) {
  try {
    const eventId: number = Number(params.id);
    const userId: number = Number(params.userId);

    console.log("Leave event", eventId, "for user", userId);
    await leaveEvent(userId, eventId);

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

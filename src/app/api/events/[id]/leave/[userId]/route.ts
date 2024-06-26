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

    await leaveEvent(userId, eventId);

    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

import { handleException } from "@/app/utils/errorHandlerUtils";
import { leaveEvent } from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string; userId: string }
 * @returns Response
 * @description Handles DELETE request to leave an event.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const id: number = Number(params.id);
    const userId: number = Number(params.userId);

    const result = await leaveEvent(id, userId);
    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

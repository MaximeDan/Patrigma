import { handleException } from "@/utils/errorHandlerUtils";
import { joinEvent } from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from "@/types/exceptions";

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
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const eventId: number = Number(params.id);
    const userId: number = Number(params.userId);

    if (isNaN(eventId) || isNaN(userId)) {
      throw new BadRequestException("Invalid event ID or user ID");
    }

    // Users can only join events for themselves
    if (session.user.id !== userId) {
      throw new ForbiddenException("You can only join events for yourself");
    }

    const result = await joinEvent(eventId, userId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

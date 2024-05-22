import { handleException } from "@/app/utils/errorHandlerUtils";
import { joinEvent } from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";

// POST /api/events/[id]/join/[userId] : join an event
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const id: number = Number(params.id);
    const userId: number = Number(params.userId);

    const result = await joinEvent(id, userId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

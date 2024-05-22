import { handleException } from "@/app/utils/errorHandlerUtils";
import { leaveEvent } from "@/services/eventService";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/events/[id]/leave/[userId] : join an event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const id: number = Number(params.id);
    const userId: number = Number(params.userId);

    const result = await leaveEvent(id, userId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

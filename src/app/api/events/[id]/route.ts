import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getEventByIdWithUserEvents,
  registerOrModifyEvent,
  removeEvent,
} from "@/services/eventService";
import { Event } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/events/[id] : get an event by id with user events
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const result = await getEventByIdWithUserEvents(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// PUT /api/events/[id] : update an event by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const body = await request.json();
    const event: Event = body.event;

    const result = await registerOrModifyEvent(id, event);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// DELETE /api/events/[id] : delete an event by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id: number = Number(params.id);

  try {
    const result = await removeEvent(id);

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

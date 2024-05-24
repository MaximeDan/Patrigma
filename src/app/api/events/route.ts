import { handleException } from "@/app/utils/errorHandlerUtils";
import { getAllEvents, registerOrModifyEvent } from "@/services/eventService";
import { eventWithoutId } from "@/types/event";
import { eventBodySchema } from "@/validators/api/eventSchema";
import { Event } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @returns NextResponse
 * @description Handles GET request to retrieve all events.
 */
export async function GET() {
  try {
    const result = await getAllEvents();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to create a new event.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    body.event.startAt = new Date(body.event.startAt);
    body.event.endAt = new Date(body.event.endAt);
    const eventParsed = eventBodySchema.parse(body);

    const event: eventWithoutId = eventParsed.event;
    const result = await registerOrModifyEvent(null, event);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

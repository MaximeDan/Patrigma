import { handleException } from "@/app/utils/errorHandlerUtils";
import { getAllEvents, registerOrModifyEvent } from "@/services/eventService";
import { EventWithoutId } from "@/types/event";
import { eventBodySchema } from "@/validators/api/eventSchema";
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

    // Parse the body with zod to get the event
    const event: EventWithoutId = eventBodySchema.parse(body).event;

    const result = await registerOrModifyEvent(null, event);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

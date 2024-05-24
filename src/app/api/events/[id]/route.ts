import { afficherTypesDesAttributs } from "@/app/utils/afficherTypesDesAttributs";
import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getEventByIdWithUserEvents,
  registerOrModifyEvent,
  removeEvent,
} from "@/services/eventService";
import { eventWithoutId } from "@/types/event";
import { eventBodySchema } from "@/validators/api/eventSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve an event by its id along with user events.
 */
export async function GET(
  request: NextRequest,
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

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles PUT request to update an event by its id.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    let body = await request.json();
    let bodytarget: object;
    afficherTypesDesAttributs<eventWithoutId>(body.event, EventWithoutId);

    const eventParsed = eventBodySchema.parse(body);

    const event: eventWithoutId = eventParsed.event;

    const result = await registerOrModifyEvent(id, event);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns Response
 * @description Handles DELETE request to delete an event by its id.
 */
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

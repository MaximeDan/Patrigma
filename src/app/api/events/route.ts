import { handleException } from "@/utils/errorHandlerUtils";
import { getAllEvents, registerOrModifyEvent } from "@/services/eventService";
import { EventRequestBody } from "@/types/event";
import { eventFormSchema } from "@/validators/EventFormSchema";
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
    const data: EventRequestBody = {
      ...body,
      accessCode: body.accessCode || undefined,
      startAt: new Date(body.startAt),
      endAt: new Date(body.endAt),
    };

    // Parse the body with zod to get the event
    const event = eventFormSchema.safeParse(data);
    if (!event.success) {
      return NextResponse.json(
        {
          message: event.error.issues[0].message,
          path: event.error.issues[0].path,
        },
        { status: 400 },
      );
    }

    const result = await registerOrModifyEvent(null, data);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

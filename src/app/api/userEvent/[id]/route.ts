import { handleException } from "@/app/utils/errorHandlerUtils";
import { getEventsByUserId } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param req
 * @returns NextResponse
 * @description Handles GET request to retrieve all events for a specific user.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = Number(params.id);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    const result = await getEventsByUserId(userId);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return handleException(error);
  }
}

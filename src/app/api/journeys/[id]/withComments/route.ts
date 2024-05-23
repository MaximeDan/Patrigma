import { handleException } from "@/app/utils/errorHandlerUtils";
import { getJourneyByIdWithComments } from "@/services/journeyService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve a journey by its id along with associated comments.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const result = await getJourneyByIdWithComments(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

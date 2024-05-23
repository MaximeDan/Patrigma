import { handleException } from "@/app/utils/errorHandlerUtils";
import { getJourneyByIdWithComments } from "@/services/journeyService";
import { NextRequest, NextResponse } from "next/server";

// GET /api/journeys/[id]/withComments : get a journey by id with associated comments
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

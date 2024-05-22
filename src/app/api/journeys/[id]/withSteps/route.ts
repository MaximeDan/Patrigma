import { handleException } from "@/app/utils/errorHandlerUtils";
import { getJourneyByIdWithSteps } from "@/services/journeyService";
import { NextRequest, NextResponse } from "next/server";

// GET /api/journeys/[id]/withSteps : get a journey by id with associated steps
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const result = await getJourneyByIdWithSteps(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

import { handleException } from "@/app/utils/errorHandlerUtils";
import { registerOrModifyStep } from "@/services/stepService";
import { Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// POST /api/steps : create a new step
export async function POST(request: NextRequest) {
  try {
    const stepData: Step = await request.json();
    const result = await registerOrModifyStep(null, stepData);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

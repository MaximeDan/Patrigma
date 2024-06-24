import { handleException } from "@/app/utils/errorHandlerUtils";
import { registerOrModifyStep } from "@/services/stepService";
import { StepWithoutDates } from "@/types/step";
import { stepBodySchema } from "@/validators/api/stepSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to create a new step.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Parse the body with zod to get the step
    const step: StepWithoutDates = stepBodySchema.parse(body).step;

    const result = await registerOrModifyStep(null, step);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

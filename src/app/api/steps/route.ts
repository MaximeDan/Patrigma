import { handleException } from "@/utils/errorHandlerUtils";
import { registerOrModifyStep } from "@/services/stepService";
import { StepWithoutDates } from "@/types/step";
import { stepBodySchema } from "@/validators/api/stepSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UnauthorizedException, BadRequestException } from "@/types/exceptions";

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to create a new step.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const body = await request.json();
    // Parse the body with zod to get the step
    const parsedBody = stepBodySchema.parse(body);

    if (!parsedBody.step.journeyId) {
      throw new BadRequestException("journeyId is required");
    }

    const step: StepWithoutDates = {
      ...parsedBody.step,
      journeyId: parsedBody.step.journeyId,
    };

    const result = await registerOrModifyStep(null, step);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

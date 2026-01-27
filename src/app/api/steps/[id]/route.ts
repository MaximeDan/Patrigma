import { handleException } from "@/utils/errorHandlerUtils";
import {
  getStepById,
  registerOrModifyStep,
  removeStep,
} from "@/services/stepService";
import { StepWithoutDates } from "@/types/step";
import { stepBodySchema } from "@/validators/api/stepSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UnauthorizedException, BadRequestException } from "@/types/exceptions";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve a step by its id.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const id: number = Number(params.id);
    if (isNaN(id)) {
      throw new BadRequestException("Invalid step ID");
    }

    const result = await getStepById(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles PUT request to update a step by its id.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const id: number = Number(params.id);
    if (isNaN(id)) {
      throw new BadRequestException("Invalid step ID");
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

    const result = await registerOrModifyStep(id, step);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns Response
 * @description Handles DELETE request to delete a step by its id.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const id: number = Number(params.id);
    if (isNaN(id)) {
      throw new BadRequestException("Invalid step ID");
    }

    await removeStep(id);

    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

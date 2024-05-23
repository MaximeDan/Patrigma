import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getStepById,
  registerOrModifyStep,
  removeStep,
} from "@/services/stepService";
import { Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve a step by its id.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
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
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const body = await request.json();
    const step: Step = body.step;

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
  { params }: { params: { id: string } }
) {
  const id: number = Number(params.id);

  try {
    const result = await removeStep(id);

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

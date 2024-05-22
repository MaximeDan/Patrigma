import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getStepById,
  registerOrModifyStep,
  removeStep,
} from "@/services/stepService";
import { Step } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/steps/[id] : get a step by id
export async function GET(
  req: NextRequest,
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

// PUT /api/steps/[id] : update a step by id
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

// DELETE /api/steps/[id] : delete a step by id
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

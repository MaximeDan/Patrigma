import { handleException } from "@/utils/errorHandlerUtils";
import {
  getCommentById,
  registerOrModifyComment,
  removeComment,
} from "@/services/commentService";
import { CommentWithoutDates } from "@/types/comment";
import { commentBodySchema } from "@/validators/api/commentSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve a comment by its id.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id: number = Number(params.id);
    const result = await getCommentById(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles PUT request to update a comment by its id.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id: number = Number(params.id);
    const body = await request.json();
    // Parse the body with zod to get the comment
    const comment: CommentWithoutDates = commentBodySchema.parse(body).comment;

    const result = await registerOrModifyComment(id, comment);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns Response
 * @description Handles DELETE request to delete a comment by its id.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id: number = Number(params.id);

  try {
    await removeComment(id);

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

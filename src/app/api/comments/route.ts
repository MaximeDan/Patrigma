import { handleException } from "@/utils/errorHandlerUtils";
import { registerOrModifyComment } from "@/services/commentService";
import { CommentWithoutDates } from "@/types/comment";
import { commentBodySchema } from "@/validators/api/commentSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to create a new comment.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Parse the body with zod to get the comment
    const comment: CommentWithoutDates = commentBodySchema.parse(body).comment;

    const result = await registerOrModifyComment(null, comment);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

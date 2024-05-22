import { handleException } from "@/app/utils/errorHandlerUtils";
import { registerOrModifyComment } from "@/services/commentService";
import { CommentWithoutDates } from "@/types/CommentWithoutDates";
import { commentBodySchema } from "@/validators/api/commentSchema";
import { Comment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// POST /api/comments : create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const comment: Comment = body.comment;
    const commentParsed = commentBodySchema.parse(request.body);

    const comment: CommentWithoutDates = commentParsed.comment;

    const result = await registerOrModifyComment(null, comment);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

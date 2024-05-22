import { handleException } from "@/app/utils/errorHandlerUtils";
import { registerOrModifyComment } from "@/services/commentService";
import { Comment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// POST /api/comments : create a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const comment: Comment = body.comment;

    const result = await registerOrModifyComment(null, comment);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

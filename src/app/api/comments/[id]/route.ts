import { handleException } from "@/app/utils/errorHandlerUtils";
import {
  getCommentById,
  registerOrModifyComment,
  removeComment,
} from "@/services/commentService";
import { Comment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/comments/[id] : get a comment by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const result = await getCommentById(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// PUT /api/comments/[id] : update a comment by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: number = Number(params.id);
    const body = await request.json();
    const comment: Comment = body.comment;

    const result = await registerOrModifyComment(id, comment);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

// DELETE /api/comments/[id] : delete a comment by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id: number = Number(params.id);

  try {
    const result = await removeComment(id);

    // Using Response instead of NextResponse because NextResponse doesn't handle status 204 actually
    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

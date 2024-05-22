import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createComment,
  readComment,
  updateComment,
  deleteComment,
} from "../repositories/commentRepository";
import { Comment } from "@prisma/client";
import { CommentWithoutDates } from "@/types/CommentWithoutDates";

// Return a comment
export const getCommentById = async (id: number): Promise<Comment | null> => {
  const comment: Comment | null = await readComment(id);
  if (!comment) throw new NotFoundException("Comment not found");

  return comment;
};

// Create or update a comment based on the id value in parameter
export const registerOrModifyComment = async (
  id: number | null,
  comment: CommentWithoutDates
): Promise<Comment | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }
  if (!comment) throw new BadRequestException("Invalid comment");

  let result: Comment | null;

  // Check if register or modify
  if (id === null) {
    result = await createComment(comment);
    if (!result)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const commentToUpdate = await readComment(id);
    if (!commentToUpdate) throw new NotFoundException("Comment not found");

    result = await updateComment(id, comment);
    if (!result)
      throw new InternalServerErrorException("Internal server error");
  }

  return result;
};

export const removeComment = async (id: number): Promise<Comment | null> => {
  const comment = await readComment(id);
  if (!comment) throw new NotFoundException("Comment not found");

  const deletedComment = await deleteComment(id);

  if (!deletedComment)
    throw new InternalServerErrorException("Internal server error");

  return deletedComment;
};

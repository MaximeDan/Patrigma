import prisma from "@/lib/prisma";
import { CommentWithoutDates } from "@/types/comment";
import { Comment } from "@prisma/client";

/**
 * @params data: CommentWithoutDates
 * @returns Comment
 * @description Creates a new comment with the provided data.
 */
export const createComment = async (
  data: CommentWithoutDates,
): Promise<Comment> => {
  return await prisma.comment.create({
    data,
  });
};

/**
 * @params id: number
 * @returns Comment | null
 * @description Retrieves a comment by its id.
 */
export const readComment = async (id: number): Promise<Comment | null> => {
  return await prisma.comment.findUnique({ where: { id } });
};

/**
 * @params id: number
 * @params data: CommentWithoutDates
 * @returns Comment | null
 * @description Updates a comment with the provided data.
 */
export const updateComment = async (
  id: number,
  data: CommentWithoutDates,
): Promise<Comment | null> => {
  return await prisma.comment.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns Comment | null
 * @description Deletes a comment by its id.
 */
export const deleteComment = async (id: number): Promise<Comment | null> => {
  return await prisma.comment.delete({ where: { id } });
};

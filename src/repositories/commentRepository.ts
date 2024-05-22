import prisma from "@/lib/prisma";
import { CommentWithoutDates } from "@/types/CommentWithoutDates";
import { Comment } from "@prisma/client";

export const createComment = async (
  data: CommentWithoutDates
): Promise<Comment> => {
  return await prisma.comment.create({
    data,
  });
};

export const readComment = async (id: number): Promise<Comment | null> => {
  return await prisma.comment.findUnique({ where: { id } });
};

export const updateComment = async (
  id: number,
  data: CommentWithoutDates
): Promise<Comment | null> => {
  return await prisma.comment.update({
    where: { id },
    data,
  });
};

export const deleteComment = async (id: number): Promise<Comment | null> => {
  return await prisma.comment.delete({ where: { id } });
};

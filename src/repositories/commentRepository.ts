import prisma from "@/lib/prisma";
import { Comment } from "@prisma/client";

export const createComment = async (data: Comment): Promise<Comment> => {
    return await prisma.comment.create({
        data,
    });
};

export const getComment = async (id: number): Promise<Comment | null> => {
    return await prisma.comment.findUnique({ where: { id } });
};

export const getComments = async (): Promise<Comment[]> => {
    return await prisma.comment.findMany();
};

export const updateComment = async (id: number, data: Comment): Promise<Comment | null> => {
    return await prisma.comment.update({
        where: { id },
        data,
    });
};

export const deleteComment = async (id: number): Promise<Comment | null> => {
    return await prisma.comment.delete({ where: { id } });
};

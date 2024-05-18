import { createComment, getComment, getComments, updateComment, deleteComment } from '../repositories/commentRepository';
import { Comment } from '@prisma/client';

export const registerComment = async (commentData: Comment): Promise<Comment> => {
    return await createComment(commentData);
};

export const getCommentById = async (id: number): Promise<Comment | null> => {
    const comment = await getComment(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    return comment;
};

export const getAllComments = async (): Promise<Comment[]> => {
    return await getComments();
};

export const modifyComment = async (id: number, commentData: Comment): Promise<Comment | null> => {
    const comment = await getComment(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    return await updateComment(id, commentData);
};

export const removeComment = async (id: number): Promise<Comment | null> => {
    const comment = await getComment(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    return await deleteComment(id);
};

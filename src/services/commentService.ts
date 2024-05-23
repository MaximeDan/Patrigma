import { InternalServerErrorException, NotFoundException } from '@/types/exceptions';
import { createComment, getComment, getComments, updateComment, deleteComment } from '../repositories/commentRepository';
import { Comment } from '@prisma/client';

export const registerComment = async (commentData: Comment): Promise<Comment> => {
    const result = await createComment(commentData);

    if (!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const getCommentById = async (id: number): Promise<Comment | null> => {
    const comment = await getComment(id);

    if (!comment) 
        throw new NotFoundException('Comment not found');
    
    return comment;
};

export const getAllComments = async (): Promise<Comment[]> => {
    const comments = await getComments();

    if(comments.length === 0) 
        throw new NotFoundException('No comments found');

    return comments;
};

export const modifyComment = async (id: number, commentData: Comment): Promise<Comment | null> => {
    const comment = await getComment(id);

    if (!comment) 
        throw new NotFoundException('Comment not found');
    
    const result = await updateComment(id, commentData);
    if(!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const removeComment = async (id: number): Promise<Comment | null> => {
    const comment = await getComment(id);

    if (!comment) 
        throw new NotFoundException('Comment not found');
    
    const result = await deleteComment(id);

    if(!result) 
        throw new InternalServerErrorException('Internal server error');

    return result;
};

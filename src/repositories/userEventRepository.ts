import prisma from "@/lib/prisma";
import { UserEvent } from "@prisma/client";

export const createUserEvent = async (data: UserEvent): Promise<UserEvent> => {
    return await prisma.userEvent.create({
        data,
    });
};

export const getUserEvent = async (id: number): Promise<UserEvent | null> => {
    return await prisma.userEvent.findUnique({ where: { id } });
};

export const getUserEvents = async (): Promise<UserEvent[]> => {
    return await prisma.userEvent.findMany();
};

export const updateUserEvent = async (id: number, data: UserEvent): Promise<UserEvent | null> => {
    return await prisma.userEvent.update({
        where: { id },
        data,
    });
};

export const deleteUserEvent = async (id: number): Promise<UserEvent | null> => {
    return await prisma.userEvent.delete({ where: { id } });
};

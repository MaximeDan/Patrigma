import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export const createUserRole = async (data: UserRole): Promise<UserRole> => {
    return await prisma.userRole.create({
        data,
    });
};

export const getUserRole = async (id: number): Promise<UserRole | null> => {
    return await prisma.userRole.findUnique({ where: { id } });
};

export const getUserRoles = async (): Promise<UserRole[]> => {
    return await prisma.userRole.findMany();
};

export const updateUserRole = async (id: number, data: UserRole): Promise<UserRole | null> => {
    return await prisma.userRole.update({
        where: { id },
        data,
    });
};

export const deleteUserRole = async (id: number): Promise<UserRole | null> => {
    return await prisma.userRole.delete({ where: { id } });
};

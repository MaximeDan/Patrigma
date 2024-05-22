import prisma from "@/lib/prisma";
import {User} from "@prisma/client";
import {RegisterUser} from "@/types/register";
import {UserRoleData} from "@/types/userRole";

export const createUser = async (data: RegisterUser): Promise<User> => {
    try {
        return await prisma.user.create({
            data,
        });
    } catch (error) {
        throw new Error('User not saved in the db');
    }
};

export const getUser = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({where: {id}});
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({where: {email}});
};

export const getUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
};

export const updateUser = async (id: number, data: User): Promise<User | null> => {
    return prisma.user.update({
        where: {id},
        data,
    });
};

export const deleteUser = async (id: number): Promise<User | null> => {
    return prisma.user.delete({where: {id}});
};

export const registerUser = async (userData: RegisterUser, userRoleData: UserRoleData): Promise<User> => {

    return prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
            data: {
                ...userData,
            },
        });

        await prisma.userRole.create({
            data: {
                ...userRoleData,
                userId: newUser.id,
            },
        });

        return newUser;
    });
};
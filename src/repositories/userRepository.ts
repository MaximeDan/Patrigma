import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const createUser = async (data: User): Promise<User> => {
  return await prisma.user.create({
    data,
  });
};

export const getUser = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
};

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const updateUser = async (id: number, data: User): Promise<User | null> => {
    return await prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: number): Promise<User | null> => {
    return await prisma.user.delete({ where: { id } });
};
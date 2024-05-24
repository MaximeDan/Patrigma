import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { RegisterUser } from "@/types/register";

export const readUser = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const readUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const readUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const updateUser = async (
  id: number,
  data: User,
): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number): Promise<User | null> => {
  return prisma.user.delete({ where: { id } });
};

export const registerUser = async (
  userData: RegisterUser,
  userRoleId: number,
): Promise<User> => {
  return prisma.$transaction(async (prisma) => {
    const newUser = await prisma.user.create({
      data: {
        ...userData,
      },
    });

    await prisma.userRole.create({
      data: {
        roleId: userRoleId,
        userId: newUser.id,
      },
    });

    return newUser;
  });
};

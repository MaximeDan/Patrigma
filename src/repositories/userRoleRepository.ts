import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { UserRoleDataWithUserId } from "@/types/userRole";

export const createUserRole = async (
  data: UserRoleDataWithUserId
): Promise<UserRole> => {
  return prisma.userRole.create({
    data,
  });
};

export const getUserRole = async (id: number): Promise<UserRole | null> => {
  return await prisma.userRole.findUnique({ where: { id } });
};

export const getUserRoles = async (): Promise<UserRole[]> => {
  return await prisma.userRole.findMany();
};

export const updateUserRole = async (
  id: number,
  data: UserRole
): Promise<UserRole | null> => {
  return await prisma.userRole.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns UserRole | null
 * @description Deletes a user role by its id.
 */
export const deleteUserRole = async (id: number): Promise<UserRole | null> => {
  return await prisma.userRole.delete({ where: { id } });
};

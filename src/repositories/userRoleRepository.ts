import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { UserRoleData } from "@/types/userRole";

/**
 * @params data: UserRoleData
 * @returns UserRole
 * @description Creates a new user role with the provided data.
 */
export const createUserRole = async (data: UserRoleData): Promise<UserRole> => {
  return prisma.userRole.create({
    data,
  });
};

/**
 * @params id: number
 * @returns UserRole | null
 * @description Retrieves a user role by its id.
 */
export const readUserRole = async (id: number): Promise<UserRole | null> => {
  return await prisma.userRole.findUnique({ where: { id } });
};

/**
 * @returns UserRole[]
 * @description Retrieves all user roles.
 */
export const readUserRoles = async (): Promise<UserRole[]> => {
  return await prisma.userRole.findMany();
};

/**
 * @params id: number
 * @params data: UserRole
 * @returns UserRole | null
 * @description Updates a user role with the provided data.
 */
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

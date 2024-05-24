import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * @params data: Role
 * @returns Role
 * @description Creates a new role with the provided data.
 */
export const createRole = async (data: Role): Promise<Role> => {
  return await prisma.role.create({
    data,
  });
};

/**
 * @params id: number
 * @returns Role | null
 * @description Retrieves a role by its id.
 */
export const readRole = async (id: number): Promise<Role | null> => {
  return await prisma.role.findUnique({ where: { id } });
};

/**
 * @returns Role[]
 * @description Retrieves all roles.
 */
export const readRoles = async (): Promise<Role[]> => {
  return await prisma.role.findMany();
};

/**
 * @params id: number
 * @params data: Role
 * @returns Role | null
 * @description Updates a role with the provided data.
 */
export const updateRole = async (
  id: number,
  data: Role,
): Promise<Role | null> => {
  return await prisma.role.update({
    where: { id },
    data,
  });
};

/**
 * @params id: number
 * @returns Role | null
 * @description Deletes a role by its id.
 */
export const deleteRole = async (id: number): Promise<Role | null> => {
  return await prisma.role.delete({ where: { id } });
};

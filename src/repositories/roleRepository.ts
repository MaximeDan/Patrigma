import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export const createRole = async (data: Role): Promise<Role> => {
  return await prisma.role.create({
    data,
  });
};

export const readRole = async (id: number): Promise<Role | null> => {
  return await prisma.role.findUnique({ where: { id } });
};

export const readRoles = async (): Promise<Role[]> => {
  return await prisma.role.findMany();
};

export const updateRole = async (
  id: number,
  data: Role
): Promise<Role | null> => {
  return await prisma.role.update({
    where: { id },
    data,
  });
};

export const deleteRole = async (id: number): Promise<Role | null> => {
  return await prisma.role.delete({ where: { id } });
};

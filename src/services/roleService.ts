import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createRole,
  readRole,
  readRoles,
  updateRole,
  deleteRole,
} from "../repositories/roleRepository";
import { Role } from "@prisma/client";

// Return a role
export const getRoleById = async (id: number): Promise<Role | null> => {
  const role: Role | null = await readRole(id);
  if (!role) throw new NotFoundException("Role not found");

  return role;
};

// Return all roles
export const getAllRoles = async (): Promise<Role[] | null> => {
  return await readRoles();
};

// Create or update a role
export const registerOrModifyRole = async (
  id: number | null,
  role: Role
): Promise<Role | null> => {
  // Check arguments
  if (id !== null && !Number.isFinite(id)) {
    throw new BadRequestException("Invalid id");
  }
  if (!role) throw new BadRequestException("Invalid role");

  let upsertedRole: Role | null;

  // Check if register or modify
  if (id === null) {
    upsertedRole = await createRole(role);
    if (!upsertedRole)
      throw new InternalServerErrorException("Internal server error");
  } else {
    const roleToUpdate = await readRole(id);
    if (!roleToUpdate) throw new NotFoundException("Role not found");

    upsertedRole = await updateRole(id, role);
    if (!upsertedRole)
      throw new InternalServerErrorException("Internal server error");
  }

  return upsertedRole;
};

export const removeRole = async (id: number): Promise<Role | null> => {
  const role = await readRole(id);
  if (!role) throw new NotFoundException("Role not found");

  const deletedRole = await deleteRole(id);

  if (!deletedRole)
    throw new InternalServerErrorException("Internal server error");

  return deletedRole;
};

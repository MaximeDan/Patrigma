import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";
import {
  createRole,
  updateRole,
  deleteRole,
  readRole,
  readRoles,
} from "../repositories/roleRepository";
import { Role } from "@prisma/client";

/**
 * @params id: number
 * @returns Role | null
 * @throws NotFoundException
 * @description Retrieves a role by its id.
 */
export const getRoleById = async (id: number): Promise<Role | null> => {
  const role: Role | null = await readRole(id);
  if (!role) throw new NotFoundException("Role not found");

  return role;
};

/**
 * @returns Role[] | null
 * @description Retrieves all roles.
 */
export const getAllRoles = async (): Promise<Role[] | null> => {
  return await readRoles();
};

/**
 * @params id: number | null
 * @params role: Role
 * @returns Role | null
 * @throws BadRequestException
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Creates or updates a role based on the id value.
 */
export const registerOrModifyRole = async (
  id: number | null,
  role: Role,
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

/**
 * @params id: number
 * @returns Role | null
 * @throws NotFoundException
 * @throws InternalServerErrorException
 * @description Deletes a role by its id.
 */
export const removeRole = async (id: number): Promise<Role | null> => {
  const role = await readRole(id);
  if (!role) throw new NotFoundException("Role not found");

  const deletedRole = await deleteRole(id);

  if (!deletedRole)
    throw new InternalServerErrorException("Internal server error");

  return deletedRole;
};

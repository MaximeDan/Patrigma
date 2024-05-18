import { createRole, readRole, readRoles, updateRole, deleteRole } from '../repositories/roleRepository';
import { Role } from '@prisma/client';

export const registerRole = async (roleData: Role): Promise<Role> => {
    return await createRole(roleData);
};

export const getRoleById = async (id: number): Promise<Role | null> => {
    const role = await readRole(id);
    if (!role) {
        throw new Error('Role not found');
    }
    return role;
};

export const getAllRoles = async (): Promise<Role[]> => {
    return await readRoles();
};

export const modifyRole = async (id: number, roleData: Role): Promise<Role | null> => {
    const role = await readRole(id);
    if (!role) {
        throw new Error('Role not found');
    }
    return await updateRole(id, roleData);
};

export const removeRole = async (id: number): Promise<Role | null> => {
    const role = await readRole(id);
    if (!role) {
        throw new Error('Role not found');
    }
    return await deleteRole(id);
};

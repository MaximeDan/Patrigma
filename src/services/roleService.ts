import { InternalServerErrorException, NotFoundException } from '@/types/exceptions';
import { createRole, getRole, getRoles, updateRole, deleteRole } from '../repositories/roleRepository';
import { Role } from '@prisma/client';

export const registerRole = async (roleData: Role): Promise<Role> => {
    const result = await createRole(roleData);

    if (!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const getRoleById = async (id: number): Promise<Role | null> => {
    const role = await getRole(id);

    if (!role) 
        throw new NotFoundException('Role not found');
    
    return role;
};

export const getAllRoles = async (): Promise<Role[]> => {
    const roles = await getRoles();

    if(roles.length === 0) 
        throw new NotFoundException('No roles found');

    return roles;
};

export const modifyRole = async (id: number, roleData: Role): Promise<Role | null> => {
    const role = await getRole(id);

    if (!role) 
        throw new NotFoundException('Role not found');
    
    const result = await updateRole(id, roleData);
    if(!result) 
        throw new InternalServerErrorException('Internal server error');
    
    return result;
};

export const removeRole = async (id: number): Promise<Role | null> => {
    const role = await getRole(id);

    if (!role) 
        throw new NotFoundException('Role not found');
    
    const result = await deleteRole(id);

    if(!result) 
        throw new InternalServerErrorException('Internal server error');

    return result;
};

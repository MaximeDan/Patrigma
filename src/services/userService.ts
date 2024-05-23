import {deleteUser, getUser, getUserByEmail, getUsers, registerUser, updateUser} from '@/repositories/userRepository';
import {createUserRole} from '@/repositories/userRoleRepository';
import {User, UserRole} from '@prisma/client';
import bcrypt from "bcrypt";
import {getRoleById} from './roleService';
import {RegisterUser} from "@/types/register";
import {UserRoleData} from "@/types/userRole";

export const register = async (userData: RegisterUser): Promise<User> => {
    try {
        const existingUser = await getUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        userData.password = await bcrypt.hash(userData.password, 10);

        const userRole = await getRoleById(1);
        if (!userRole) {
            throw new Error('Role not found');
        }

        const userRoleData: UserRoleData = {
            roleId: userRole.id,
        };

        return await registerUser(userData, userRoleData);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const signIn = async (email: string, password: string): Promise<{ user: User }> => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return { user };
};

export const assignRoleToUser = async (userId: number, roleId: number): Promise<UserRole> => {
    const userRoleData: UserRoleData = {
        userId,
        roleId,
    };
    return await createUserRole(userRoleData);
};

export const getUserById = async (id: number): Promise<User | null> => {
    const user = await getUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const getAllUsers = async (): Promise<User[]> => {
    return await getUsers();
};

export const modifyUser = async (id: number, userData: User): Promise<User | null> => {
    const user = await getUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    return await updateUser(id, userData);
};

export const removeUser = async (id: number): Promise<User | null> => {
    const user = await getUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    return await deleteUser(id);
};


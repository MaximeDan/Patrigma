import { createUser, getUser, getUsers, updateUser, deleteUser, getUserByEmail } from '../repositories/userRepository';
import { createUserRole } from '../repositories/userRoleRepository';
import { User, UserRole } from '@prisma/client';
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { getRoleById } from './roleService';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
export type RegisterUser = {
    email: string;
    password: string;
    username: string;
 };

export const register = async (email: string, username:string, password: string): Promise<User> => {
   try{
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: RegisterUser = {
        email,
        password: hashedPassword,
        username,
    };

    console.log(userData);
    const userRole = await getRoleById(1);
    if (!userRole) {
        throw new Error('Role not found');
    }

    const newUser = await createUser(userData);
    console.log(newUser);  
    const userRoleData: UserRole = {
        userId: newUser.id,
        roleId: userRole.id,
        id: 0 
    };
    await createUserRole(userRoleData);

    return newUser;
   } 
   catch (error) {
    throw new Error('User not created');
   }
};

export const signIn = async (email: string, password: string): Promise<string> => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // Générer un token JWT
    const token = await new SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(JWT_SECRET);

    return token;
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
};

export const assignRoleToUser = async (userId: number, roleId: number): Promise<UserRole> => {
    // Assigner le rôle à l'utilisateur
    const userRoleData: UserRole = {
        userId,
        roleId,
        id: 0 // L'id sera généré automatiquement par Prisma
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


import { createUser, readUser, readUsers, updateUser, deleteUser } from '../repositories/userRepository';
import { createUserRole, readUserRole } from '../repositories/userRoleRepository';
import { User, UserRole } from '@prisma/client';
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { getRoleById } from './roleService';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const registerUser = async (userData: User, roleId: number): Promise<User> => {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Verify that the role exists
    const userRole = await getRoleById(roleId);
    if (!userRole) {
        throw new Error('Role not found');
    }

    // Create the user
    const newUser = await createUser(userData);
    
    // Assign the role to the user
    const userRoleData: UserRole = {
        userId: newUser.id,
        roleId: roleId,
        id: 0 
    };
    await createUserRole(userRoleData);

    return newUser;
};

export const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await readUserByEmail(email);
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
        userId: userId,
        roleId: roleId,
        id: 0 // L'id sera généré automatiquement par Prisma
    };
    return await createUserRole(userRoleData);
};

export const getUserById = async (id: number): Promise<User | null> => {
    const user = await readUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const getAllUsers = async (): Promise<User[]> => {
    return await readUsers();
};

export const modifyUser = async (id: number, userData: User): Promise<User | null> => {
    const user = await readUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    return await updateUser(id, userData);
};

export const removeUser = async (id: number): Promise<User | null> => {
    const user = await readUser(id);
    if (!user) {
        throw new Error('User not found');
    }
    return await deleteUser(id);
};

// Ajoutez cette fonction pour lire un utilisateur par email
const readUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } });
};

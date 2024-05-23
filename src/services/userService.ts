import {
  deleteUser,
  readUser,
  readUserByEmail,
  readUsers,
  registerUser,
  updateUser,
} from "@/repositories/userRepository";
import { createUserRole } from "@/repositories/userRoleRepository";
import { User, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { getRoleById } from "./roleService";
import { RegisterUser } from "@/types/register";
import { UserRoleData } from "@/types/userRole";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/types/exceptions";

export const register = async (userData: RegisterUser): Promise<User> => {
  const existingUser = await readUserByEmail(userData.email);
  if (existingUser) throw new BadRequestException("Email already in use");

  userData.password = await bcrypt.hash(userData.password, 10);
  if (!userData.password)
    throw new InternalServerErrorException("Password not hashed");

  const userRole = await getRoleById(1);
  if (!userRole) throw new NotFoundException("Role not found");

  return await registerUser(userData, userRole.id);
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ user: User }> => {
  const user = await readUserByEmail(email);
  if (!user) throw new NotFoundException("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new BadRequestException("Invalid password");

  return { user };
};

export const assignRoleToUser = async (
  userId: number,
  roleId: number
): Promise<UserRole> => {
  const userRoleData: UserRoleData = {
    userId,
    roleId,
  };
  return await createUserRole(userRoleData);
};

export const getUserById = async (id: number): Promise<User | null> => {
  const user = await readUser(id);
  if (!user) throw new NotFoundException("User not found");
  return user;
};

export const getAllUsers = async (): Promise<User[]> => {
  return await readUsers();
};

export const modifyUser = async (
  id: number,
  userData: User
): Promise<User | null> => {
  const user = await readUser(id);
  if (!user) throw new NotFoundException("User not found");

  return await updateUser(id, userData);
};

export const removeUser = async (id: number): Promise<User | null> => {
  const user = await readUser(id);
  if (!user) throw new NotFoundException("User not found");

  return await deleteUser(id);
};

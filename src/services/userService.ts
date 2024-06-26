import {
  deleteUser,
  readUser,
  readUserByEmail,
  readUsers,
  registerUser,
  updateUser,
} from "@/repositories/userRepository";
import { createUserRole } from "@/repositories/userRoleRepository";
import { User, UserRole, Event } from "@prisma/client";
import bcrypt from "bcrypt";
import { getRoleById } from "./roleService";
import { RegisterUser } from "@/types/register";
import { UserRoleDataWithUserId } from "@/types/userRole";
import { BadRequestException, NotFoundException } from "@/types/exceptions";
import { readEventsByUserId } from "@/repositories/userEventRepository";

/**
 * @params userData: RegisterUser
 * @returns User
 * @throws BadRequestException
 * @throws InternalServerErrorException
 * @throws NotFoundException
 * @description Registers a new user with the provided data.
 */
export const register = async (userData: RegisterUser): Promise<User> => {
  const existingUser = await readUserByEmail(userData.email);
  if (existingUser) throw new BadRequestException("Email already in use");

  userData.password = await bcrypt.hash(userData.password, 10);

  const userRole = await getRoleById(1);
  if (!userRole) throw new NotFoundException("Role not found");

  return await registerUser(userData, userRole.id);
};

/**
 * @params email: string
 * @params password: string
 * @returns { user: User }
 * @throws NotFoundException
 * @throws BadRequestException
 * @description Signs in a user with the provided email and password.
 */
export const signIn = async (
  email: string,
  password: string,
): Promise<{ user: User }> => {
  const user = await readUserByEmail(email);
  if (!user) throw new NotFoundException("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new BadRequestException("Invalid password");

  return { user };
};

/**
 * @params userId: number
 * @params roleId: number
 * @returns UserRole
 * @description Assigns a role to a user.
 */
export const assignRoleToUser = async (
  userId: number,
  roleId: number,
): Promise<UserRole> => {
  const userRoleData: UserRoleDataWithUserId = {
    userId,
    roleId,
  };
  return await createUserRole(userRoleData);
};

/**
 * @params id: number
 * @returns User | null
 * @throws NotFoundException
 * @description Retrieves a user by their id.
 */
export const getUserById = async (id: number): Promise<User | null> => {
  const user = await readUser(id);
  if (!user) throw new NotFoundException("User not found");
  return user;
};

/**
 * @returns User[]
 * @description Retrieves all users.
 */
export const getAllUsers = async (): Promise<User[]> => {
  return await readUsers();
};

/**
 * @params id: number
 * @params userData: User
 * @returns User | null
 * @throws NotFoundException
 * @description Updates a user with the provided data.
 */
export const modifyUser = async (
  id: number,
  userData: User,
): Promise<User | null> => {
  const user = await readUser(id);
  if (!user) throw new NotFoundException("User not found");

  return await updateUser(id, userData);
};

/**
 * @params id: number
 * @returns User | null
 * @throws NotFoundException
 * @description Deletes a user by their id.
 */
export const removeUser = async (id: number): Promise<User | null> => {
  const user = await readUser(id);
  if (!user) throw new NotFoundException("User not found");

  return await deleteUser(id);
};

/**
 * @params userId: number
 * @returns Event[]
 * @description Retrieves all events for a specific user.
 */
export const getEventsByUserId = async (userId: number): Promise<Event[]> => {
  return await readEventsByUserId(userId);
};

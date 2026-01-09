import { handleException } from "@/utils/errorHandlerUtils";
import { getUserById, modifyUser, removeUser } from "@/services/userService";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import {
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from "@/types/exceptions";

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles GET request to retrieve a user by its id.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const id: number = Number(params.id);
    if (isNaN(id)) {
      throw new BadRequestException("Invalid user ID");
    }

    // Users can only view their own profile unless they're admins
    if (session.user.id !== id) {
      // TODO: Add admin role check here
      throw new ForbiddenException("You can only view your own profile");
    }

    const result = await getUserById(id);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns NextResponse
 * @description Handles PUT request to update a user by its id.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const id: number = Number(params.id);
    if (isNaN(id)) {
      throw new BadRequestException("Invalid user ID");
    }

    // Users can only modify their own profile
    if (session.user.id !== id) {
      throw new ForbiddenException("You can only modify your own profile");
    }

    const body = await request.json();
    const user: User = body.user;

    const result = await modifyUser(id, user);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

/**
 * @params request: NextRequest
 * @params params: { id: string }
 * @returns Response
 * @description Handles DELETE request to delete a user by its id.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const id: number = Number(params.id);
    if (isNaN(id)) {
      throw new BadRequestException("Invalid user ID");
    }

    // Users can only delete their own account
    if (session.user.id !== id) {
      throw new ForbiddenException("You can only delete your own account");
    }

    await removeUser(id);

    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    return handleException(error);
  }
}

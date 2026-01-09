import { handleException } from "@/utils/errorHandlerUtils";
import { getAllUsers } from "@/services/userService";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { UnauthorizedException } from "@/types/exceptions";

/**
 * @returns NextResponse
 * @description Handles GET request to retrieve all users.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new UnauthorizedException("Unauthorized");
    }

    const result = await getAllUsers();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

import { handleException } from "@/utils/errorHandlerUtils";
import { getAllUsers } from "@/services/userService";
import { NextResponse } from "next/server";

/**
 * @returns NextResponse
 * @description Handles GET request to retrieve all users.
 */
export async function GET() {
  try {
    const result = await getAllUsers();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return handleException(error);
  }
}

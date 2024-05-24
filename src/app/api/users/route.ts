import { handleException } from "@/app/utils/errorHandlerUtils";
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

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles PUT request to modify an existing user.
 */
// export async function PUT(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const userId: string = body.userId;
//     const user: User = body.user;

//     const result = await registerOrModifyUser(userId, user);
//     return NextResponse.json({ data: result }, { status: 200 });
//   } catch (error: any) {
//     return handleException(error);
//   }
// }

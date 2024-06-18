import { NextRequest, NextResponse } from "next/server";
import { register } from "@/services/userService";
import { RegisterUser } from "@/types/register";
import { handleException } from "@/app/utils/errorHandlerUtils";
import { BadRequestException } from "@/types/exceptions";

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to register a new user.
 */
async function handler(request: NextRequest): Promise<NextResponse> {
  const data = await request.json();

  try {
    const requiredFields = [
      "email",
      "password",
      "username",
      "name",
      "lastName",
      "dateOfBirth",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new BadRequestException(`${field} is required`);
      }
    }
    const userData: RegisterUser = {
      email: data.email,
      password: data.password,
      username: data.username,
      name: data.name,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
    };

    const newUser = await register(userData);
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error: any) {
    return handleException(error);
  }
}

export { handler as POST };

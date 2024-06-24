import { NextRequest, NextResponse } from "next/server";
import { register } from "@/services/userService";
import { RegisterUser } from "@/types/register";
import { handleException } from "@/app/utils/errorHandlerUtils";
import registerSchema from "@/validators/registerSchema";

/**
 * @params request: NextRequest
 * @returns NextResponse
 * @description Handles POST request to register a new user.
 */
async function handler(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json();
    console.log(data);
    const validatedData = registerSchema.parse(data);

    const userData: RegisterUser = {
      email: validatedData.email,
      password: validatedData.password,
      username: validatedData.username,
      name: validatedData.name,
      lastName: validatedData.lastName,
      dateOfBirth: validatedData.dateOfBirth,
    };

    const newUser = await register(userData);
    console.log("response:", newUser);
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return handleException(error);
  }
}

export { handler as POST };

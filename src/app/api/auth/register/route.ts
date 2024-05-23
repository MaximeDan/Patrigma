import { NextRequest, NextResponse } from "next/server";
import { register } from "@/services/userService";
import { RegisterUser } from "@/types/register";
import { handleException } from "@/app/utils/errorHandlerUtils";

async function handler(request: NextRequest): Promise<NextResponse> {
  const data = await request.json();

  try {
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

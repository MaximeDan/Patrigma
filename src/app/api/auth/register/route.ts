import { NextRequest, NextResponse } from "next/server";
import { register } from "@/services/userService";
import { RegisterUser } from "@/types/register";

async function handler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();

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
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export { handler as POST };

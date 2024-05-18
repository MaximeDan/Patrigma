import { NextRequest, NextResponse } from "next/server";
import { register } from "../../../../services/userService";

async function handler(req: NextRequest): Promise<NextResponse> {
    const data = await req.json();

    try {
        const newUser = await register(data.email, data.username, data.password);

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export { handler as POST };
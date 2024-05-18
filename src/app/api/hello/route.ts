import { NextResponse } from "next/server";

export function GET() {
  return Response.json({ message: "hello world !" });
}

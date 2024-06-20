import { NextResponse } from "next/server";
import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from "@/types/exceptions";
import { ZodError } from "zod";

/**
 * @params error: any
 * @returns NextResponse
 * @description Handles exceptions and returns appropriate HTTP response based on the error type.
 */
export function handleException(error: any) {
  console.error("An error occurred:", error);

  switch (true) {
    case error instanceof BadRequestException:
      return NextResponse.json({ message: error.message }, { status: 400 });
    case error instanceof ZodError: {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }
    case error instanceof UnauthorizedException:
      return NextResponse.json({ message: error.message }, { status: 401 });
    case error instanceof ForbiddenException:
      return NextResponse.json({ message: error.message }, { status: 403 });
    case error instanceof NotFoundException:
      return NextResponse.json({ message: error.message }, { status: 404 });
    case error instanceof InternalServerErrorException:
      return NextResponse.json({ message: error.message }, { status: 500 });
    default:
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 },
      );
  }
}

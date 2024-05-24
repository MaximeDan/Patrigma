import { NextResponse } from "next/server";
import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from "@/types/exceptions";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

/**
 * @params error: any
 * @returns NextResponse
 * @description Handles exceptions and returns appropriate HTTP response based on the error type.
 */
export function handleException(error: any) {
  // console.error("An error occurred:", error);

  switch (true) {
    case error instanceof BadRequestException:
    case error instanceof ZodError:
      return NextResponse.json({ message: error.message }, { status: 400 });
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
        { status: 500 }
      );
  }
}

export function handlePrismaException(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientValidationError
) {
  const message = error.message;
  const status = 500;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json({ message }, { status: 400 });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return NextResponse.json({ message }, { status: 400 });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return NextResponse.json({ message }, { status: 500 });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json({ message }, { status: 500 });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json({ message }, { status: 400 });
  }

  return NextResponse.json({ message }, { status });
}

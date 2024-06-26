import { NextResponse } from "next/server";
import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from "@/types/exceptions";
import { ZodError, ZodIssueCode } from "zod";
import { Prisma } from "@prisma/client";

/**
 * @params error: any
 * @returns NextResponse
 * @description Handles exceptions and returns appropriate HTTP response based on the error type.
 */
export function handleException(error: any) {
  switch (true) {
    case error instanceof ZodError:
      return NextResponse.json(
        { message: formatZodErrors(error) },
        { status: 400 },
      );
    case error instanceof BadRequestException:
      return NextResponse.json({ message: error.message }, { status: 400 });

    case error instanceof UnauthorizedException:
      return NextResponse.json({ message: error.message }, { status: 401 });
    case error instanceof ForbiddenException:
      return NextResponse.json({ message: error.message }, { status: 403 });
    case error instanceof NotFoundException:
      console.log("error not found");
      return NextResponse.json({ message: error.message }, { status: 404 });
    case error instanceof InternalServerErrorException:
      return NextResponse.json({ message: error.message }, { status: 500 });

    case error instanceof Prisma.PrismaClientKnownRequestError:
      return NextResponse.json({ message: error.message }, { status: 400 });
    case error instanceof Prisma.PrismaClientUnknownRequestError:
      return NextResponse.json({ message: error.message }, { status: 400 });
    case error instanceof Prisma.PrismaClientRustPanicError:
      return NextResponse.json({ message: error.message }, { status: 500 });
    case error instanceof Prisma.PrismaClientInitializationError:
      return NextResponse.json({ message: error.message }, { status: 500 });
    case error instanceof Prisma.PrismaClientValidationError:
      return NextResponse.json({ message: error.message }, { status: 400 });

    default:
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 },
      );
  }
}

function formatZodErrors(error: ZodError): string {
  return error.errors
    .map((e) => {
      const path = e.path.join(" -> ");
      let message = `Error at ${path}: ${e.message}`;

      // Handle specific issue types
      switch (e.code) {
        case ZodIssueCode.invalid_type:
          message += ` (expected ${e.expected}, received** ${e.received})`;
          break;
        case ZodIssueCode.invalid_literal:
          message += ` (expected ${e.expected}, received** ${e.received})`;
          break;
        case ZodIssueCode.too_small:
          message += ` (minimum ${e.minimum}, inclusive: ${e.inclusive})`;
          break;
        case ZodIssueCode.too_big:
          message += ` (maximum ${e.maximum}, inclusive: ${e.inclusive})`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message += ` (expected one of: ${e.options.join(
            ", ",
          )}, received**: ${e.received})`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message += ` (unrecognized keys: ${e.keys.join(", ")})`;
          break;
        case ZodIssueCode.invalid_string:
          message += ` (validation: ${e.validation})`;
          break;
      }

      return message;
    })
    .join("; ");
}

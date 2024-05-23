import { NextResponse } from "next/server";
import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from "@/types/exceptions";
import {
  ZodError,
  ZodInvalidEnumValueIssue,
  ZodInvalidLiteralIssue,
  ZodInvalidStringIssue,
  ZodInvalidTypeIssue,
  ZodIssueCode,
  ZodTooBigIssue,
  ZodTooSmallIssue,
  ZodUnrecognizedKeysIssue,
} from "zod";

/**
 * @params error: any
 * @returns NextResponse
 * @description Handles exceptions and returns appropriate HTTP response based on the error type.
 */
export function handleException(error: any) {
  console.error("An error occurred:", error);

  switch (true) {
    case error instanceof ZodError:
      const formattedMessage = formatZodErrors(error);
      return NextResponse.json({ message: formattedMessage }, { status: 400 });
    case error instanceof BadRequestException:
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

function formatZodErrors(error: ZodError): string {
  return error.errors
    .map((e) => {
      const path = e.path.join(" -> ");
      let message = `Error at ${path}: ${e.message}`;

      // Handle specific issue types
      switch (e.code) {
        case ZodIssueCode.invalid_type:
          const invalidTypeIssue = e as ZodInvalidTypeIssue;
          message += ` (expected ${invalidTypeIssue.expected}, received ${invalidTypeIssue.received})`;
          break;
        case ZodIssueCode.invalid_literal:
          const invalidLiteralIssue = e as ZodInvalidLiteralIssue;
          message += ` (expected ${invalidLiteralIssue.expected}, received ${invalidLiteralIssue.received})`;
          break;
        case ZodIssueCode.too_small:
          const tooSmallIssue = e as ZodTooSmallIssue;
          message += ` (minimum ${tooSmallIssue.minimum}, inclusive: ${tooSmallIssue.inclusive})`;
          break;
        case ZodIssueCode.too_big:
          const tooBigIssue = e as ZodTooBigIssue;
          message += ` (maximum ${tooBigIssue.maximum}, inclusive: ${tooBigIssue.inclusive})`;
          break;
        case ZodIssueCode.invalid_enum_value:
          const enumIssue = e as ZodInvalidEnumValueIssue;
          message += ` (expected one of: ${enumIssue.options.join(
            ", "
          )}, received: ${enumIssue.received})`;
          break;
        case ZodIssueCode.unrecognized_keys:
          const keysIssue = e as ZodUnrecognizedKeysIssue;
          message += ` (unrecognized keys: ${keysIssue.keys.join(", ")})`;
          break;
        case ZodIssueCode.invalid_string:
          const stringIssue = e as ZodInvalidStringIssue;
          message += ` (validation: ${stringIssue.validation})`;
          break;
      }

      return message;
    })
    .join("; ");
}

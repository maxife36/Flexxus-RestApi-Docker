import { ApiError } from "./ApiError";
import { HttpStatusCode, ErrorMessage } from "../enums";
import { ValidationMessage } from "../validationErrorHandler";

export class ValidationError extends ApiError {
  public readonly validationErrors: ValidationMessage[];

  constructor(
    errorMessages: ValidationMessage[],
    message: ErrorMessage | string = ErrorMessage.BAD_REQUEST
  ) {
    super(message, HttpStatusCode.BAD_REQUEST);
    this.validationErrors = errorMessages;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    message: ErrorMessage | string = ErrorMessage.UNAUTHORIZED_ACCESS
  ) {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: ErrorMessage | string = ErrorMessage.FORBIDDEN) {
    super(message, HttpStatusCode.FORBIDDEN);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: ErrorMessage | string = ErrorMessage.NOT_FOUND) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    message: ErrorMessage | string = ErrorMessage.INTERNAL_SERVER_ERROR
  ) {
    super(message, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}
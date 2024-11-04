import { ErrorMessage, HttpStatusCode } from "../enums";

export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;

  constructor(message: (ErrorMessage | string), statusCode: HttpStatusCode) {
      super(message);
      this.statusCode = statusCode;

      // Captura el stack de la pila de errores
      Error.captureStackTrace(this, this.constructor);
  }
}


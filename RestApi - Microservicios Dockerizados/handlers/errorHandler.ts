import { Request, Response, NextFunction } from "express";
import { ApiError } from "./errors/ApiError";
import { HttpStatusCode } from "./enums";
import { ValidationError } from "./errors/Errors";
import { ExternalApiError } from "./errors/ExternalApiError";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      error: true,
      statusCode: err.statusCode,
      message: err.message,
      details: err.validationErrors,
    });
  } else if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: true,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else if (err instanceof ExternalApiError) {
    res.status(err.statusCode).json({
      error: true,
      ...err
    });
  } else {
    console.error(err);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: true,
      statusCode:HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      details: err.message
    });
  }
};

export default errorHandler;

import { Request, Response, NextFunction } from "express";
import TokenUtils from "../utils/tokenUtils";
import { ForbiddenError } from "../../handlers/errors/Errors";

type LoggedUserPayload = { userId: string };

export default async function LoggedAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.loggedUser;    

    if (!token) {
      throw new ForbiddenError();
    }

    const decoded = TokenUtils.decodeToken(token) as LoggedUserPayload;

    if (!decoded.userId) throw new ForbiddenError();

    next();
  } catch (error) {
    next(error);
  }
}

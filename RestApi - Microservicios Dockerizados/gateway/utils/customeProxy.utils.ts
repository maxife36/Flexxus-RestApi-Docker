import {
  ExternalApiError,
  ExternalserviceError,
} from "../src/handlers/errors/ExternalApiError";
import {
  SuccessResponse,
} from "../src/handlers/responseHandler";
import { Request, Response, NextFunction } from "express";

class customeProxy {
  private route: string;
  private port: number;
  public readonly on: () => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  constructor(route: string, port: number) {
    this.route = route;
    this.port = port;
    this.on = this.middleware;
  }

  public middleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const apiUrl = `http://${this.route}:${this.port}${req.originalUrl.replace(
          `/${this.route}`,
          ""
        )}`;
        
        const response = await fetch(apiUrl, {
          method: req.method,
          headers: {
            "Content-Type": "application/json",
            Cookie: customeProxy.attachCookies(req),
          },
          body: req.method === "GET" ? undefined : JSON.stringify(req.body),
        });

        if (!response.ok) {
          const errorData: ExternalserviceError = await response.json();
          
          throw new ExternalApiError(errorData);
        }

        const cookies = response.headers.get("set-cookie");

        if (cookies) {
          res.setHeader("Set-Cookie", cookies);
        }

        const data: SuccessResponse = await response.json();

        res.status(data.statusCode).json(data);
      } catch (error) {
        next(error);
      }
    };
  }

  private static attachCookies(req: Request): string {
    const cookies = req.cookies;
    return Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
  }
}

export default customeProxy;

// @types/express.d.ts (o en una carpeta similar)
import * as express from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      payload?: (string | JwtPayload); 
    }
  }
}

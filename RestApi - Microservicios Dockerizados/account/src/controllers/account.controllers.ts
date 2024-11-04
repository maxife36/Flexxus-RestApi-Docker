import { Request, Response, NextFunction } from "express";
import AccountService from "../services/account.service";
import TokenUtils from "../auth/utils/tokenUtils";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";
import { responseHandler } from "../handlers/responseHandler";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      body.currentService = req.cookies.currentService
      
      const user = await AccountService.register(body);

      const { password, ...secureUser } = user;

      return responseHandler(res, secureUser, HttpStatusCode.CREATED, {
        message: SuccessMessage.RESOURCE_CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body
      body.currentService = req.cookies.currentService

      const user = await AccountService.login(body);
      
      const token = TokenUtils.generateToken({userId: user.id});      
      
      res.cookie('loggedUser', token, {
        httpOnly: true,
        maxAge: 1000*60*60,
      });
      
      return responseHandler(res);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

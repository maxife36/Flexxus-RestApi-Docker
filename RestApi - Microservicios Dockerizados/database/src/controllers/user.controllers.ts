import { Request, Response, NextFunction } from "express";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";
import { responseHandler } from "../handlers/responseHandler";
import UserService from "../services/user.service";


class UserControllers {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;

      const { count, rows, totalPages } = await UserService.getAllUsers(
        page,
        limit
      );

      const metadata = {
        currentPage: page,
        totalPages,
        totalRecords: count,
        limit,
      };

      return responseHandler(res, rows, HttpStatusCode.OK, metadata);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUser(userId);
      return responseHandler(res, user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query
     
     const user = await UserService.getUserFilter(queryParams)
     
      return responseHandler(res, user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body

      const user = await UserService.createUser(body)

      return responseHandler(res, user, HttpStatusCode.CREATED, {
        message: SuccessMessage.RESOURCE_CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const body = req.body;

      await UserService.updateUser(userId, body)

      return responseHandler(res, {}, HttpStatusCode.OK, {
        message: SuccessMessage.RESOURCE_UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      
      await UserService.deleteUser(userId)

      return responseHandler(res, {}, HttpStatusCode.OK, {
        message: SuccessMessage.RESOURCE_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserControllers;

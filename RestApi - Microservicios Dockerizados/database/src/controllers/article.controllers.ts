import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/article.service";
import { responseHandler } from "../handlers/responseHandler";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";

class ArticlesControllers {
  static async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;

      const { count, rows, totalPages } = await ArticleService.getAllArticles(
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

  static async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const registerId = req.params.id;

      const article = await ArticleService.getArticle(registerId);

      return responseHandler(res, article);
    } catch (error) {
      next(error);
    }
  }

  static async getFilteredArticles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { page, limit, exact, ...queryParams } = req.query;

      const pageValue = parseInt(page as string) || 1;
      const limitValue = parseInt(limit as string) || 50;
      const exactValue = (exact as string) === "true" ? true : false;

      const { count, rows, totalPages } =
        await ArticleService.getFilteredArticles(queryParams, {
          exact: exactValue,
          page:pageValue,
          limit:limitValue,
        });

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

  static async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const article = await ArticleService.createArticle(body);

      return responseHandler(res, article, HttpStatusCode.CREATED, {
        message: SuccessMessage.RESOURCE_CREATED,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const registerId = req.params.id;
      const body = req.body;

      await ArticleService.updateArticle(registerId, body);

      return responseHandler(res, [], HttpStatusCode.OK, {
        message: SuccessMessage.RESOURCE_UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const registerId = req.params.id;
      
      await ArticleService.deleteArticle(registerId)

      return responseHandler(res, [], HttpStatusCode.OK, {
        message: SuccessMessage.RESOURCE_DELETED,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ArticlesControllers;

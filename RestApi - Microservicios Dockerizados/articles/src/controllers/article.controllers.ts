import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/article.service";
import { responseHandler } from "../handlers/responseHandler";
import { HttpStatusCode, SuccessMessage } from "../handlers/enums";

class ArticlesControllers {
  static async getAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const currentService = req.cookies.currentService;

      const articles = await ArticleService.getAllArticles(
        page,
        limit,
        currentService
      );
      
      res.status(articles.statusCode).json(articles);
    } catch (error) {
      next(error);
    }
  }

  static async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const registerId = req.params.id;
      const currentService = req.cookies.currentService;

      const article = await ArticleService.getArticle(
        registerId,
        currentService
      );

      res.status(article.statusCode).json(article);
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

      const currentService = req.cookies.currentService;
      
      const articles = await ArticleService.getFilteredArticles(
        queryParams,
        {
          exact: exactValue,
          page:pageValue,
          limit:limitValue,
        },
        currentService
      );

      res.status(articles.statusCode).json(articles);
    } catch (error) {
      next(error);
    }
  }

  static async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      body.currentService = req.cookies.currentService;

      const article = await ArticleService.createArticle(body);

      res.status(article.statusCode).json(article);
    } catch (error) {
      next(error);
    }
  }

  static async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const registerId = req.params.id;
      const body = req.body;
      body.currentService = req.cookies.currentService;

      const article = await ArticleService.updateArticle(registerId, body);

      res.status(article.statusCode).json(article);
    } catch (error) {
      next(error);
    }
  }

  static async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const registerId = req.params.id;
      const currentService = req.cookies.currentService;

      const article = await ArticleService.deleteArticle(
        registerId,
        currentService
      );

      res.status(article.statusCode).json(article);
    } catch (error) {
      next(error);
    }
  }
}

export default ArticlesControllers;

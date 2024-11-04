import dotenv from "dotenv";


import path from "path";
import {
  ExternalApiError,
  ExternalserviceError,
} from "../handlers/errors/ExternalApiError";
import { SuccessResponse } from "../handlers/responseHandler";

dotenv.config({ path: path.resolve("../.env") });

const DATABASE_PORT = process.env.DATABASE_CONTAINER_PORT;

const databaseServiceUrl = `http://database:${DATABASE_PORT}/api/articles`;

class ArticleService {
  static async getAllArticles(page: number, limit: number, service: string) {
    const url = `${databaseServiceUrl}?page=${page}&limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `originService=${service}`,
      },
    });

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const articles: SuccessResponse = await response.json();

    return articles;
  }

  static async getArticle(registerId: string, service: string) {
    const url = `${databaseServiceUrl}/${registerId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `originService=${service}`,
      },
    });

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const article: SuccessResponse = await response.json();

    return article;
  }

  static async getFilteredArticles(
    queryParams: object,
    config: { exact: boolean; page: number; limit: number },
    service: string
  ) {
    const { page, limit, exact } = config;

    const requestedParams = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const stringParams = requestedParams ? `&${requestedParams}` : "";

    const url = `${databaseServiceUrl}/filter?page=${page}&limit=${limit}&exact=${exact}${stringParams}`;
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `originService=${service}`,
      },
    });

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const articles: SuccessResponse = await response.json();

    return articles;
  }

  static async createArticle(body: {[key:string]:string}) {
    const url = `${databaseServiceUrl}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `originService=${body.currentService}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const article: SuccessResponse = await response.json();

    return article;
  }

  static async updateArticle(registerId: string, body: {[key:string]:string}) {
    const url = `${databaseServiceUrl}/${registerId}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `originService=${body.currentService}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      
      const errorData: ExternalserviceError = await response.json();
      
      throw new ExternalApiError(errorData);
    }
    
    const article: SuccessResponse = await response.json();

    return article;
  }

  static async deleteArticle(registerId: string, service: string) {
    const url = `${databaseServiceUrl}/${registerId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `originService=${service}`,
      },
    });

    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const article: SuccessResponse = await response.json();

    return article;
  }
}

export default ArticleService;

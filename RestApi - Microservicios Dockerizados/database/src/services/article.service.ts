import {
  ArticleDto,
  FilterArticleDto,
  UpdateArticleDto,
} from "../dtos/article.dto";
import Models from "../config/models/index";
import { NotFoundError } from "../handlers/errors/Errors";
import { validate } from "class-validator";
import { ValidationErrorHandler } from "../handlers/validationErrorHandler";
import { Op } from "sequelize";
import likeStringConfig from "../utils/likeStringConfig";

const { Article } = Models;

class ArticleService {
  static async getAllArticles(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Article.findAndCountAll({ limit, offset });

    const totalPages = Math.ceil(count / limit);

    return { count, rows, totalPages };
  }

  static async getArticle(registerId: string) {
    const article = await Article.findByPk(registerId);
    if (!article) {
      throw new NotFoundError();
    }
    return article;
  }

  static async getFilteredArticles(
    queryParams: {[key:string]:any},
    config: { exact: boolean; page: number; limit: number }
  ) {
    const { exact, page, limit } = config;

    const offset = (page - 1) * limit;

    const articleDto = FilterArticleDto.fromPlain(queryParams);
    let errors = await validate(articleDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const allowedAttributes = Object.keys(Article.getAttributes());

    const whereConfig = Object.entries(articleDto).reduce<
      { [key: string]: any }[]
    >((acc, [key, value]) => {
      if (allowedAttributes.includes(key)) {
        const condition =
          typeof value === "string"
            ? { [Op.like]: likeStringConfig(value, exact) }
            : value;

        acc.push({ [key]: condition });
      }
      return acc;
    }, []);

    // Busqueda por filtro
    const { count, rows } = await Article.findAndCountAll({
      where: {
        [Op.or]: whereConfig,
      },
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return { count, rows, totalPages };
  }

  static async createArticle(body: object) {
    const articleDto = ArticleDto.fromPlain(body);
    let errors = await validate(articleDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const article = await Article.create(articleDto);

    return article;
  }

  static async updateArticle(registerId: string, body: object) {
    const articleDto = UpdateArticleDto.fromPlain(body);
    let errors = await validate(ArticleDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const article = await Article.findByPk(registerId);

    if (!article) {
      throw new NotFoundError();
    }

    await article.update(articleDto);
  }

  static async deleteArticle(registerId: string) {
    const article = await Article.findByPk(registerId);
    if (!article) {
      throw new NotFoundError();
    }
    await article.update({ active: 0 });
  }
}

export default ArticleService;

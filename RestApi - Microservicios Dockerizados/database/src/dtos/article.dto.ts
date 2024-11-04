import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { plainToClass, Transform } from "class-transformer";

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  brand!: string;

  @IsOptional()
  @Transform(({ value }) => value ?? 1)
  @IsIn([0, 1], { message: "active debe ser 0 o 1" })
  active?: number;

  static fromPlain(plain: object): ArticleDto {
    return plainToClass(ArticleDto, plain);
  }
}

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @Transform(({ value }) => value ?? 1)
  @IsIn([0, 1], { message: "active debe ser 0 o 1" })
  active?: number;

  static fromPlain(plain: object): UpdateArticleDto {
    return plainToClass(UpdateArticleDto, plain);
  }
}

export class FilterArticleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @Transform(({ value }) => value ?? "1")
  @IsIn(["0", "1"], { message: "active debe ser 0 o 1" })
  active?: number;

  static fromPlain(plain: object) {
    return plainToClass(FilterArticleDto, plain);
  }
}

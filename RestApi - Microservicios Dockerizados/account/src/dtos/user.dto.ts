import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { plainToClass } from "class-transformer";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50) 
  password!: string;

  static fromPlain(plain: object): UserDto {
    return plainToClass(UserDto, plain);
  }
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50) 
  password!: string;
  
  static fromPlain(plain: object): LoginUserDto {
    return plainToClass(LoginUserDto, plain);
  }
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(6, 50)
  password?: string;

  static fromPlain(plain: object): UpdateUserDto {
    return plainToClass(UpdateUserDto, plain);
  }
}


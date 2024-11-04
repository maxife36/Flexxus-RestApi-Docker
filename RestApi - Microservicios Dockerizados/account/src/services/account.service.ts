import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { LoginUserDto, UserDto } from "../dtos/user.dto";
import {
  ExternalApiError,
  ExternalserviceError,
} from "../handlers/errors/ExternalApiError";
import { SuccessResponse } from "../handlers/responseHandler";
import { ValidationErrorHandler } from "../handlers/validationErrorHandler";
import { ForbiddenError } from "../handlers/errors/Errors";
import { validate } from "class-validator";

import path from 'path';

dotenv.config({ path: path.resolve( '../.env') });;

const DATABASE_PORT = process.env.DATABASE_CONTAINER_PORT;

const databaseServiceUrl = `http://database:${DATABASE_PORT}/api/users`;

class AccountService {
  static async register(body:{[key:string]:any}) {
    
    const userDto = UserDto.fromPlain(body);
    
    let errors = await validate(userDto);
    
    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }
    
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    
    userDto.password = hashedPassword;
    
    const url = `${databaseServiceUrl}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `originService=${body.currentService}`
      },
      body: JSON.stringify(userDto),
    });
    
    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();

      throw new ExternalApiError(errorData);
    }

    const user: SuccessResponse = await response.json();

    return user.data;
  }

  static async login(body:{[key:string]:any}) {

    const userDto = LoginUserDto.fromPlain(body);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }
    
    const url = `${databaseServiceUrl}/filter?username=${userDto.username}`;
    
    const response = await fetch(url,{
      method: "GET",
      headers: {
        "Cookie": `originService=${body.currentService}`
      }
    });
    
    if (!response.ok) {
      const errorData: ExternalserviceError = await response.json();
      throw new ExternalApiError(errorData);
    }

    const user: SuccessResponse = await response.json();

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.data.password
    );

    if (!isPasswordCorrect) throw new ForbiddenError();

    return user.data;
  }
}

export default AccountService;

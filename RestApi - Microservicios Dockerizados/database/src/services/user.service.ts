import { UpdateUserDto, UserDto, UserFilterDto } from "../dtos/user.dto";
import Models from "../config/models/index";
import { NotFoundError } from "../handlers/errors/Errors";
import { validate } from "class-validator";
import { ValidationErrorHandler } from "../handlers/validationErrorHandler";
import checkUniqueFields from "../utils/checkUniqueFields";
import { Op } from "sequelize";

const { User } = Models;

class UserService {
  static async getAllUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return { count, rows, totalPages };
  }

  static async getUser(registerId: string) {
    const user = await User.findByPk(registerId);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }

  static async getUserFilter(queryParams: object) {
    const userDto = UserFilterDto.fromPlain(queryParams);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }
    
    //dejo abierto para futuro filtrar por otros parametros modificando el user.dto
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: userDto.username }],
      },
    });
    
    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }

  static async createUser(body: object) {
    const userDto = UserDto.fromPlain(body);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    errors = await checkUniqueFields(User, userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const user = await User.create(userDto);

    return user;
  }

  static async updateUser(registerId: string, body: object) {
    const userDto = UpdateUserDto.fromPlain(body);
    let errors = await validate(userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    errors = await checkUniqueFields(User, userDto);

    if (errors.length > 0) {
      throw ValidationErrorHandler(errors);
    }

    const user = await User.findByPk(registerId);

    if (!user) {
      throw new NotFoundError();
    }

    await user.update(userDto);
  }

  static async deleteUser(registerId: string) {
 
      const user = await User.findByPk(registerId);

      if (!user) {
        throw new NotFoundError();
      }

      await user.destroy();
  }
}

export default UserService;

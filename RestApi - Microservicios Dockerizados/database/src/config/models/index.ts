import sequelize from "../config";

import Users from "./users"
import Articles from "./articles"

export default {
    User: Users(sequelize),
    Article: Articles(sequelize),
}
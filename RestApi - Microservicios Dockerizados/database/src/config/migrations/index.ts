import actions from "../../utils/migrations";

import migrationsTable from "./migrations"
import usersMigrations from "./users"
import articlesMigrations from "./articles"

const {firstMigrate, migrate, sequelize} = actions

async function migrateAll() {

    await firstMigrate(migrationsTable.up)
    await migrate(usersMigrations.up, usersMigrations.pathName)
    await migrate(articlesMigrations.up, articlesMigrations.pathName)
    await sequelize.close()
}

migrateAll()

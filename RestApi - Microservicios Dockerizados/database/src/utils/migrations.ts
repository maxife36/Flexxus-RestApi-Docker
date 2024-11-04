import { QueryInterface } from "sequelize";
import crypto from "crypto";
import sequelize from "../config/config";

const actions = {
  sequelize: sequelize,
  firstMigrate: async function (
    up: (queryInterface: QueryInterface) => Promise<void>
  ) {
    try {
      const queryInterface = sequelize.getQueryInterface();
      await up(queryInterface);
      console.log("Migration applied successfully");
    } catch (error) {
      console.error("Migration failed:", error);
    }
  },
  migrate: async function (
    up: (queryInterface: QueryInterface) => Promise<void>,
    migrationName: string
  ) {
    const queryInterface = sequelize.getQueryInterface();
    try {
      // Verificar si la migración ya se aplicó
      const migrationRecord = await queryInterface.rawSelect(
        "migrations",
        {
          where: { name: migrationName },
        },
        ["name"]
      );

      if (!migrationRecord) {
        await up(queryInterface);

        // Insertar registro de la migración
        await queryInterface.bulkInsert("migrations", [
          {
            id: crypto.randomUUID(),
            name: migrationName,
            createdAt: new Date()
          },
        ]);

        console.log(`Migration "${migrationName}" applied successfully`);
      } else {
        console.log(`Migration "${migrationName}" has already been applied`);
      }
    } catch (error) {
      console.error("Migration failed:", error);
    }
  },
  rollback: async function (
    down: (queryInterface: QueryInterface) => Promise<void>
  ) {
    try {
      const queryInterface = sequelize.getQueryInterface();
      await down(queryInterface);
      console.log("Migration rolled back successfully");
    } catch (error) {
      console.error("Rollback failed:", error);
    }
  },
};

export default actions;

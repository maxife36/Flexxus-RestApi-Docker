import path from "path";
import { QueryInterface, DataTypes } from "sequelize";

const migrations = {
  up: async function (queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable("articles", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async function (queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable("articles");
  },
  
  pathName: path.basename(__filename)
};

export default migrations;

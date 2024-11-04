import { QueryInterface, DataTypes } from "sequelize";
import path from "path";

const migrations = {
  up: async function (queryInterface: QueryInterface): Promise<void> {
    
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
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
    await queryInterface.dropTable("users");
  },
  
  pathName: path.basename(__filename)
};

export default migrations;

import { QueryInterface, DataTypes } from 'sequelize';

const migrations = {
    up: async function(queryInterface: QueryInterface): Promise<void> {
        // Verificar si la tabla ya existe
        const tableExists = await queryInterface.showAllTables()
            .then((tables: string[]) => tables.includes('migrations'));

        // Crear la tabla solo si no existe
        if (!tableExists) {
            await queryInterface.createTable('migrations', {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                },
                name: {
                    type: DataTypes.STRING(255),
                    unique: true,
                    allowNull: false,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            });
            console.log("Table 'migrations' created successfully.");
        } else {
            console.log("Table 'migrations' already exists. Skipping creation.");
        }
    },

    down: async function(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('migrations');
    }
}

export default migrations;

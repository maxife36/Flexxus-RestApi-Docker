import { Model, DataTypes, Optional,Sequelize } from 'sequelize';

interface ArticleAttributes {
  id: string;
  name: string;
  brand: string;
  active?:number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ArticleCreationAttributes extends Optional<ArticleAttributes, 'id'> {}

class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
  
  public id!: string;
  public name!: string;
  public brand!: string;
  public active!:number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Article.init(
    {
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
      }
    },
    {
      sequelize,
      tableName: "articles",
      timestamps: true,
    }
  );

  return Article;
};

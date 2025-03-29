import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
  } from 'sequelize';

  export class Movies extends Model<
    InferAttributes<Movies>,
    InferCreationAttributes<Movies>
  > {
    declare id: CreationOptional<number>;
    declare title: string;
    declare posterPath: string;
    declare overview: string;
    declare imdbId: string;
  }

    export function MovieFactory(sequelize: Sequelize) {
        Movies.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
            title: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            posterPath: {
            type: DataTypes.STRING,
            allowNull: true,
            },
            overview: {
            type: DataTypes.TEXT,
            allowNull: true,
            },
            imdbId: {
            type: DataTypes.STRING,
            allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Movies',
        }
        );
        return Movies;
    }



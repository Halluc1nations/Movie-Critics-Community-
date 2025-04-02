
import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
  } from 'sequelize';


  export class Review extends Model<
    InferAttributes<Review>,
    InferCreationAttributes<Review>
  > {
    declare id: CreationOptional<number>;
    declare username: string;
    declare comment: string;
    declare rating: number;
    declare movieId: number;
    declare thumbsUp: CreationOptional<number>;
    declare thumbsDown: CreationOptional<number>;
  }

  export function ReviewFactory(sequelize: Sequelize) {
    Review.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        movieId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        thumbsUp: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        thumbsDown: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'Review',
      }
    );
    return Review;
  }



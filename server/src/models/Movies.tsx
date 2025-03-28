// src/models/Movie.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'movies'
})
export default class Movie extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  posterPath?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  overview?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imdbId?: string;
}

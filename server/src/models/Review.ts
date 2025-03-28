import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Movie from './Movies';

@Table({
  tableName: 'reviews',
})
export default class Review extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating?: number;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  movieId!: number;

  @BelongsTo(() => Movie)
  movie!: Movie;
}

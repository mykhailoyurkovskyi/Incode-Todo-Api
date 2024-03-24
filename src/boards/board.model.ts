/* eslint-disable indent */
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { TodoModel } from '../todo/todo.model';

@Table({
  tableName: 'boards',
  createdAt: false,
  updatedAt: false,
})
export class BoardModel extends Model {
  @Unique
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  boardId: string;

  @Unique
  @Column({
    type: DataType.STRING,
  })
  boardName: string;

  @HasMany(() => TodoModel)
  todos: TodoModel[];
}

/* eslint-disable prettier/prettier */
import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { TodoStatus } from '../types/TodoStatus';

@Table({
  tableName: 'todos',
  createdAt: false,
  updatedAt: false,
})
export class TodoModel extends Model {
  @Unique
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
    id: string;

  @Unique
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
    name: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
  })
    description: string;

  @Column({
    type: DataType.ENUM(...Object.values(TodoStatus)),
    allowNull: false,
  })
    status: TodoStatus;
}

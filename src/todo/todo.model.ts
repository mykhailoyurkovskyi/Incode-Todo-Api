import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { TodoStatus } from '../types/TodoStatus';
import { generateUniqueHashedId } from '../utilities/generateUniqueHashedId';

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
    type: DataType.STRING(250),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(TodoStatus)),
    allowNull: false,
  })
  status: TodoStatus;

  async afterCreate() {
    this.id = await generateUniqueHashedId();
  }
}
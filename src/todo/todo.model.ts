/* eslint-disable prettier/prettier */
import {
  Model,
  Column,
  Table,
  AutoIncrement,
  Unique,
  Index,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { TodoStatus } from '../types/TodoStatus';
import { BoardModel } from '../boards/board.model';

@Table({
  tableName: 'todos',
  createdAt: false,
  updatedAt: false,
})

export class TodoModel extends Model {
  @Unique
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
    id: number;

  @Index
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
    title: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
  })
    description: string;

  @Index
  @Column({
    type: DataType.ENUM(...Object.values(TodoStatus)),
    allowNull: false,
  })
    status: TodoStatus;

  @ForeignKey(() => BoardModel)
  @Column
    boardId: string;
  
  @BelongsTo(() => BoardModel)
    board: BoardModel;
}

import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import { BaseController } from '../common/base.controller';
import { ITodoController } from './todo.controller.interface';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';
import { ITodoService } from './todo.service.interface';
import { TodoModel } from './todo.model';
import { TodoStatus } from '../types/TodoStatus';
import { IBoardService } from '../boards/board.service.interface';
import { ValidateMiddleware } from '../middlewares/validate.middleware';

@injectable()
export class TodoController extends BaseController implements ITodoController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TodoService) private todoService: ITodoService,
    @inject(TYPES.BoardService) private boardService: IBoardService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/getAllTodos',
        method: 'post',
        func: this.getAllTodos,
        middlewares: [new ValidateMiddleware(TodoModel)],
      },
      {
        path: '/createTodo',
        method: 'post',
        func: this.createTodo,
      },
      {
        path: '/deleteTodo/:id',
        method: 'delete',
        func: this.deleteTodo,
      },
      {
        path: '/updateTodo',
        method: 'post',
        func: this.updateTodo,
      },
    ]);
  }

  async getAllTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { boardId } = req.body;
    const todos: TodoModel[] = await this.todoService.getAllTodos(boardId);

    res.status(200).json(todos);
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    const { boardId, title, description } = req.body;

    const createdTodo: TodoModel | null = await this.todoService.createTodo(
      boardId,
      title,
      description,
    );

    res.status(201).json(createdTodo);
  }

  async deleteTodo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.todoService.deleteTodo(parseInt(id));

    res
      .status(200)
      .json({ message: `Todo with id ${id} deleted successfully` });
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    const { id, updateData } = req.body;

    await this.todoService.updateTodo(parseInt(id), updateData);

    res.status(200).json({
      message: 'Todo  updated successfully',
    });
  }
}

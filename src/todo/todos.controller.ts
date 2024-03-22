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

@injectable()
export class TodoController extends BaseController implements ITodoController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TodoService) private todoService: ITodoService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/getAllTodos',
        method: 'get',
        func: this.getAllTodos,
      },
      {
        path: '/createTodo',
        method: 'post',
        func: this.createTodo,
      },
      {
        path: '/deleteTodo/:name',
        method: 'delete',
        func: this.deleteTodoByName,
      },
      {
        path: '/updateTodo/:id',
        method: 'patch',
        func: this.updateTodo,
      },
      {
        path: '/getTodo/:name',
        method: 'get',
        func: this.getTodoByName,
      },
    ]);
  }

  async getAllTodos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const todos: TodoModel[] = await this.todoService.getAllTodos();

    res.status(200).json(todos);
  }

  async getTodoByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    const todo = await this.todoService.getTodoByName(name);

    res.status(200).json({ todo });
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;

    const createdTodo: TodoModel = await this.todoService.createTodo(
      name,
      description,
    );

    res.status(201).json(createdTodo);
  }

  async deleteTodoByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    await this.todoService.deleteTodoByName(name);

    res
      .status(200)
      .json({ message: `Todo with name ${name} deleted successfully` });
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, status } = req.body;

    await this.todoService.updateTodo(id, name, status);

    res.status(200).json({
      message: `Status of todo with name ${name} updated successfully`,
    });
  }
}

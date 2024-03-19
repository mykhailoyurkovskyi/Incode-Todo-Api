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
        path: '/updateTodo/:name',
        method: 'put',
        func: this.updateTodoStatus,
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
    try {
      const todos: TodoModel[] = await this.todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      this.loggerService.error('Failed to fetch todos', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  }

  async getTodoByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;

      if (!name) {
        res.status(400).json({ error: 'Name parameter is required' });
        return;
      }

      const todo = await this.todoService.getTodoByName(name);

      if (!todo) {
        res.status(404).json({ error: `Todo with name ${name} not found` });
        return;
      }

      res.status(200).json({ todo });
    } catch (error) {
      console.error('Failed to get todo by name:', error);
      res.status(500).json({ error: 'Failed to get todo by name' });
    }
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;

      if (!name || typeof name !== 'string' || name.length > 100) {
        res.status(400).json({
          error:
            'Name should not be empty and must be a string with maximum length of 100 characters',
        });
        return;
      }

      if (
        description &&
        (typeof description !== 'string' || description.length > 250)
      ) {
        res.status(400).json({
          error:
            'Description must be a string with maximum length of 250 characters',
        });
        return;
      }

      const createdTodo: TodoModel = await this.todoService.createTodo(
        name,
        description,
      );
      res.status(201).json({ todo: createdTodo });
    } catch (error) {
      this.loggerService.error('Failed to create todo', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }

  async deleteTodoByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;

      if (!name) {
        res.status(400).json({ error: 'Name parameter is required' });
        return;
      }

      await this.todoService.deleteTodoByName(name);
      res
        .status(200)
        .json({ message: `Todo with name ${name} deleted successfully` });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }

  async updateTodoStatus(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      const { status } = req.body;

      if (!name || !status) {
        res.status(400).json({ error: 'Name and status are required' });
        return;
      }

      const validStatuses = ['ToDo', 'In Progress', 'Done'];

      if (!validStatuses.includes(status)) {
        res.status(400).json({
          error: `Invalid status. Valid options are: ${validStatuses.join(', ')}`,
        });
        return;
      }

      await this.todoService.updateTodoStatus(name, status);
      res.status(200).json({
        message: `Status of todo with name ${name} updated successfully`,
      });
    } catch (error) {
      console.error('Failed to update todo status:', error);
      res.status(500).json({ error: 'Failed to update todo status' });
    }
  }
}

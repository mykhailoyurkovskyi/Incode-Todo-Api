import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { TYPES } from './types/types';
import { ILogger } from './logger/logger.interface';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ISequelize } from './db/sequelize.interface';
import { ITodoService } from './todo/todo.service.interface';
import { TodoController } from './todo/todos.controller';
import { TodoRepository } from './todo/todo.repository';
import { BoardRepository } from './boards/board.repository';
import { BoardService } from './boards/board.service';
import { BoardController } from './boards/board.controller';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number | string | undefined;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.SequelizeService) private sequelizeService: ISequelize,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TodoService) private todoService: ITodoService,
    @inject(TYPES.TodoController) private todoController: TodoController,
    @inject(TYPES.TodoRepository) private todoRepository: TodoRepository,
    @inject(TYPES.BoardRepository) private boardRepository: BoardRepository,
    @inject(TYPES.BoardService) private boardService: BoardService,
    @inject(TYPES.BoardController) private boardController: BoardController,
  ) {
    this.app = express();
    this.port = this.configService.get('PORT') || process.env.PORT;
    this.configureMiddleware();
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: '*',
        credentials: true,
      }),
    );
  }

  configureMiddleware(): void {
    this.app.use(express.json());
    this.useCors();
    this.useRoutes();
    this.useExceptionFilters();
  }

  useRoutes(): void {
    this.app.use('/todos', this.todoController.router);
    this.app.use('/boards', this.boardController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }

  public close(): void {
    this.server.close();
  }
}

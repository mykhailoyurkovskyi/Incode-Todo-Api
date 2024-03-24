import { Container, ContainerModule, interfaces } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types/types';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { SequelizeService } from './db/sequelize.service';
import { ISequelize } from './db/sequelize.interface';
import { ITodoController } from './todo/todo.controller.interface';
import { TodoController } from './todo/todos.controller';
import { ITodoService } from './todo/todo.service.interface';
import { TodoService } from './todo/todo.service';
import { ITodoRepository } from './todo/todo.repository.interface';
import { TodoRepository } from './todo/todo.repository';
import { BoardRepository } from './boards/board.repository';
import { IBoardRepository } from './boards/board.repository.interface';
import { IBoardService } from './boards/board.service.interface';
import { BoardService } from './boards/board.service';
import { IBoardController } from './boards/board.controller.interface';
import { BoardController } from './boards/board.controller';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<ISequelize>(TYPES.SequelizeService)
    .to(SequelizeService)
    .inSingletonScope();
  bind<ITodoController>(TYPES.TodoController).to(TodoController);
  bind<ITodoService>(TYPES.TodoService).to(TodoService);
  bind<ITodoRepository>(TYPES.TodoRepository).to(TodoRepository);
  bind<IBoardRepository>(TYPES.BoardRepository).to(BoardRepository);
  bind<IBoardService>(TYPES.BoardService).to(BoardService);
  bind<IBoardController>(TYPES.BoardController).to(BoardController);
  bind<App>(TYPES.Application).to(App);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
});

async function bootstrap(): Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  await app.init();
  return { app, appContainer };
}

export const boot = bootstrap();

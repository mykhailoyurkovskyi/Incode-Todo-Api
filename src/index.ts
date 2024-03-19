import { Container, ContainerModule, interfaces } from "inversify";
import 'reflect-metadata';
import { TYPES } from "./types/types";
import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { ExceptionFilter } from "./errors/exception.filter";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { SequelizeService } from "./db/sequelize.service";
import { ISequelize } from "./db/sequelize.interface";

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
  bind<App>(TYPES.Application).to(App);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
import 'reflect-metadata';
import { inject, injectable } from "inversify";
import express, { Express } from "express";
import { Server } from 'http';
import cors from 'cors';
import { TYPES } from './types/types';
import { ILogger } from './logger/logger.interface';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ISequelize } from './db/sequelize.interface';

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
  ) {
    this.app = express();
    this.port = this.configService.get('PORT') || process.env.PORT;
    this.configureMiddleware();
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: this.configService.get('CLIENT_URL') || process.env.CLIENT_URL,
        credentials: true,
      }),
    );
  }

  configureMiddleware(): void {
    this.app.use(express.json());
    this.useCors();
    this.useRoutes();
    this.useExceptionFilters();
    this.useStaticImg();
  }

  useStaticImg(): void {
    this.app.use(express.static('public'));
    this.app.use(express.static(__dirname + '/public'));
  }

  useRoutes(): void {
    
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
}
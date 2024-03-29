import { Request, Response, NextFunction } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types/types';
import 'reflect-metadata';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.logger = logger;
  }

  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`,
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}

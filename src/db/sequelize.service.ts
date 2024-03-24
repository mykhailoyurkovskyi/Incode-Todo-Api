import { inject, injectable } from 'inversify';
import { ISequelize } from './sequelize.interface';
import { Sequelize } from 'sequelize-typescript';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { TodoModel } from '../todo/todo.model';
import { BoardModel } from '../boards/board.model';

@injectable()
export class SequelizeService implements ISequelize {
  sequelize: Sequelize;

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.ILogger) private logger: ILogger,
  ) {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: this.configService.get('DB_HOST') || process.env.DB_HOST,
      username: this.configService.get('DB_USER') || process.env.DB_USER,
      password:
        this.configService.get('DB_PASSWORD') || process.env.DB_PASSWORD,
      database: this.configService.get('DB_NAME') || process.env.DB_NAME,
      dialectOptions: {
        ssl: true,
      },
      define: {
        scopes: {
          excludeCreatedAtUpdateAt: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        },
        timestamps: false,
      },
    });

    this.sequelize.addModels([TodoModel, BoardModel]);

    this.logger.log('[Sequelize] Connected to db successfully');
  }
}

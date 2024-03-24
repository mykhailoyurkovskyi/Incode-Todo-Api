import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IBoardController } from './board.controller.interface';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';
import { IBoardService } from './board.service.interface';
import { TYPES } from '../types/types';
import { Request, Response, NextFunction } from 'express';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { BoardModel } from './board.model';

@injectable()
export class BoardController
  extends BaseController
  implements IBoardController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.BoardService) private boardService: IBoardService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/getBoard',
        method: 'post',
        func: this.getBoard,
        middlewares: [new ValidateMiddleware(BoardModel)],
      },
      {
        path: '/createBoard',
        method: 'post',
        func: this.createBoard,
      },
    ]);
  }

  async getBoard(req: Request, res: Response): Promise<void> {
    const { boardId } = req.body;

    const board = await this.boardService.get(boardId);
    res.status(200).json(board);
  }

  async createBoard(req: Request, res: Response): Promise<void> {
    const { boardId, boardName } = req.body;

    const createdBoard = await this.boardService.create(boardId, boardName);

    res.status(201).json(createdBoard);
  }
}

import { inject, injectable } from 'inversify';
import { IBoardRepository } from './board.repository.interface';
import { IConfigService } from '../config/config.service.interface';
import { IBoardService } from './board.service.interface';
import { TYPES } from '../types/types';
import { BoardModel } from './board.model';
import { hash } from '../utilities/generateUniqueHashedId';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class BoardService implements IBoardService {
  TodoModel: any;
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.BoardRepository) private boardRepository: IBoardRepository,
  ) {}
  async get(id: string): Promise<BoardModel | undefined> {
    try {
      if (!id) {
        throw new Error('ID must be provided.');
      }

      const hashedId = hash(id);
      const board = await this.boardRepository.get(hashedId);

      if (!board) {
        throw new Error('Board not found.');
      }

      return board;
    } catch (error) {
      this.loggerService.error(`Error getting board: ${error}`);
    }
  }

  async create(id: string, boardName: string): Promise<BoardModel | undefined> {
    try {
      if (!id || !boardName) {
        throw new Error('Both ID and name must be provided.');
      }

      const hashedId = hash(id);

      const boardModel = new BoardModel({
        boardId: hashedId,
        boardName,
      });

      const createdBoard = await this.boardRepository.create(boardModel);
      return createdBoard;
    } catch (error) {
      this.loggerService.error(`Error creating board: ${error}`);
    }
  }
}

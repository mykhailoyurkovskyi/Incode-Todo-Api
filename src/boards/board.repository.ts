import { injectable } from 'inversify';
import { TodoStatus } from '../types/TodoStatus';
import { IBoardRepository } from './board.repository.interface';
import { BoardModel } from './board.model';
import { hash } from '../utilities/generateUniqueHashedId';

@injectable()
export class BoardRepository implements IBoardRepository {
  async get(boardId: string): Promise<BoardModel | null> {
    const board = await BoardModel.findOne({ where: { boardId } });
    return board;
  }

  async create(board: BoardModel): Promise<BoardModel> {
    const createdBoard: BoardModel = await board.save();

    return createdBoard;
  }
}

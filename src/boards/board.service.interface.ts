import { BoardModel } from './board.model';

export interface IBoardService {
  get(id: string): Promise<BoardModel | undefined>;
  create(id: string, boardName: string): Promise<BoardModel | undefined>;
}

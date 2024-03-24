import { BoardModel } from './board.model';

export interface IBoardRepository {
  get(id: string): Promise<BoardModel | null>;
  create(board: BoardModel): Promise<BoardModel>;
}

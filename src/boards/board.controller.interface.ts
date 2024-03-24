import { Request, Response, NextFunction } from 'express';

export interface IBoardController {
  getBoard(req: Request, res: Response): Promise<void>;
  createBoard(req: Request, res: Response): Promise<void>;
}

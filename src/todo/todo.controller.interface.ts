import { Request, Response, NextFunction } from 'express';

export interface ITodoController {
  getAllTodos(req: Request, res: Response, next: NextFunction): Promise<void>;
  createTodo(req: Request, res: Response): Promise<void>;
  deleteTodo(req: Request, res: Response): Promise<void>;
  updateTodo(req: Request, res: Response): Promise<void>;
}

import { Request, Response, NextFunction } from 'express';

export interface ITodoController {
  getAllTodos(req: Request, res: Response, next: NextFunction): Promise<void>;
  createTodo(req: Request, res: Response): Promise<void>;
  deleteTodoByName(req: Request, res: Response): Promise<void>;
  getTodoByName(req: Request, res: Response): Promise<void>;
  updateTodo(req: Request, res: Response): Promise<void>;
}

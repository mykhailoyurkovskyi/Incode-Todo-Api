import { TodoModel } from './todo.model';

export interface ITodoService {
  getAllTodos(): Promise<TodoModel[]>;
  createTodo(name: string, description: string): Promise<TodoModel>;
  deleteTodoByName(name: string): Promise<void>;
  updateTodo(id: string, name: string, status: string): Promise<void>;
  getTodoByName(name: string): Promise<TodoModel | null>;
}

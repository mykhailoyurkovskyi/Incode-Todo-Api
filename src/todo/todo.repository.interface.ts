import { TodoModel } from './todo.model';

export interface ITodoRepository {
  createTodo(todo: TodoModel): Promise<TodoModel>;
  deleteTodoByName(name: string): Promise<void>;
  getAllTodos(): Promise<TodoModel[]>;
  updateTodo(id: string, name: string, status: string): Promise<void>;
  getTodoByName(name: string): Promise<TodoModel | null>;
}

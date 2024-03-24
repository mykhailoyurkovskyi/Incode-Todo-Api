import { TodoStatus } from '../types/TodoStatus';
import { UpdateTodoDto } from '../types/UpdateTodoDto';
import { TodoModel } from './todo.model';

export interface ITodoService {
  getAllTodos(boardId: string): Promise<TodoModel[]>;
  createTodo(
    boardId: string,
    name: string,
    description: string,
  ): Promise<TodoModel | null>;
  deleteTodo(id: number): Promise<void>;
  updateTodo(id: number, todo: UpdateTodoDto): Promise<void>;
}

import { TodoStatus } from '../types/TodoStatus';
import { UpdateTodoDto } from '../types/UpdateTodoDto';
import { TodoModel } from './todo.model';

export interface ITodoRepository {
  createTodo(todo: TodoModel): Promise<TodoModel>;
  deleteTodo(id: number): Promise<void>;
  getAllTodos(boardId: string): Promise<TodoModel[]>;
  updateTodo(id: number, updateData: UpdateTodoDto): Promise<void>;
}

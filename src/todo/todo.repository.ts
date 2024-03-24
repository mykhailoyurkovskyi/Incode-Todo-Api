import { injectable } from 'inversify';
import { TodoStatus } from '../types/TodoStatus';
import { TodoModel } from './todo.model';
import { ITodoRepository } from './todo.repository.interface';
import { UpdateTodoDto } from '../types/UpdateTodoDto';

@injectable()
export class TodoRepository implements ITodoRepository {
  async createTodo(todo: TodoModel): Promise<TodoModel> {
    const createdTodo: TodoModel = await todo.save();

    return createdTodo;
  }

  async deleteTodo(id: number): Promise<void> {
    await TodoModel.destroy({ where: { id } });
  }

  async getAllTodos(boardId: string): Promise<TodoModel[]> {
    const todos = await TodoModel.findAll({ where: { boardId } });

    return todos;
  }

  async updateTodo(id: number, updateData: UpdateTodoDto): Promise<void> {
    const { title, status, description } = updateData;
    await TodoModel.update({ title, status, description }, { where: { id } });
  }
}

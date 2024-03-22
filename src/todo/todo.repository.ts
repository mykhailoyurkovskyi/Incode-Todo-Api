import { injectable } from 'inversify';
import { generateUniqueHashedId } from '../utilities/generateUniqueHashedId';
import { TodoStatus } from '../types/TodoStatus';
import { TodoModel } from './todo.model';
import { ITodoRepository } from './todo.repository.interface';

@injectable()
export class TodoRepository implements ITodoRepository {
  async createTodo(todo: TodoModel): Promise<TodoModel> {
    const createdTodo: TodoModel = await todo.save();

    return createdTodo;
  }

  async deleteTodoByName(name: string): Promise<void> {
    await TodoModel.destroy({ where: { name } });
  }

  async getAllTodos(): Promise<TodoModel[]> {
    const todos: TodoModel[] = await TodoModel.findAll();

    return todos;
  }

  async updateTodo(id: string, name: string, status: string): Promise<void> {
    await TodoModel.update({ name, status }, { where: { id } });
  }

  async getTodoByName(name: string): Promise<TodoModel | null> {
    const todo = await TodoModel.findOne({ where: { name } });
    return todo || null;
  }
}

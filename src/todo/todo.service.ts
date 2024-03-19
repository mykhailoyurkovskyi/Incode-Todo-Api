import { inject, injectable } from 'inversify';
import { ITodoService } from './todo.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { TodoModel } from './todo.model';
import { generateUniqueHashedId } from '../utilities/generateUniqueHashedId';
import { TodoStatus } from '../types/TodoStatus';

@injectable()
export class TodoService implements ITodoService {
  TodoModel: any;
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {}

  async createTodo(name: string, description: string): Promise<TodoModel> {
    try {
      const hashedId = await generateUniqueHashedId();
      const status = TodoStatus.TODO;
      const todoModel = new TodoModel({
        id: hashedId,
        name,
        status,
        description,
      });
      const createdTodo: TodoModel = await todoModel.save();

      return createdTodo;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  async deleteTodoByName(name: string): Promise<void> {
    try {
      await TodoModel.destroy({ where: { name } });
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  }

  async getAllTodos(): Promise<TodoModel[]> {
    try {
      const todos: TodoModel[] = await TodoModel.findAll();

      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async updateTodoStatus(name: string, status: string): Promise<void> {
    try {
      await TodoModel.update({ status }, { where: { name } });
    } catch (error) {
      throw new Error('Failed to update todo status');
    }
  }

  async getTodoByName(name: string): Promise<TodoModel | null> {
    try {
      const todo = await TodoModel.findOne({ where: { name } });
      return todo || null;
    } catch (error) {
      throw new Error('Failed to get todo by name');
    }
  }
}

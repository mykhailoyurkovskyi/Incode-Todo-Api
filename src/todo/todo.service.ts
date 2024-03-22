import { inject, injectable } from 'inversify';
import { ITodoService } from './todo.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { TodoModel } from './todo.model';
import { generateUniqueHashedId } from '../utilities/generateUniqueHashedId';
import { TodoStatus } from '../types/TodoStatus';
import { ITodoRepository } from './todo.repository.interface';

@injectable()
export class TodoService implements ITodoService {
  TodoModel: any;
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TodoRepository) private todoRepository: ITodoRepository,
  ) {}

  async createTodo(name: string, description: string): Promise<TodoModel> {
    if (name.length > 100) {
      throw new Error('Name cannot be longer than 100 characters');
    }

    if (description && description.length > 250) {
      throw new Error('Description cannot be longer than 250 characters');
    }

    if (!name || name.trim() === '') {
      throw new Error('Name cannot be empty');
    }

    if (description && description.trim() === '') {
      throw new Error('Description cannot be empty');
    }

    try {
      const hashedId = await generateUniqueHashedId();
      const status = TodoStatus.TODO;
      const todoModel = new TodoModel({
        id: hashedId,
        name,
        status,
        description,
      });
      const createdTodo: TodoModel =
        await this.todoRepository.createTodo(todoModel);

      return createdTodo;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  async deleteTodoByName(name: string): Promise<void> {
    try {
      await this.todoRepository.deleteTodoByName(name);
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  }

  async getAllTodos(): Promise<TodoModel[]> {
    try {
      const todos: TodoModel[] = await this.todoRepository.getAllTodos();

      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  }

  async updateTodo(id: string, name: string, status: string): Promise<void> {
    try {
      await this.todoRepository.updateTodo(id, name, status);
    } catch (error) {
      throw new Error('Failed to update todo status');
    }
  }

  async getTodoByName(name: string): Promise<TodoModel | null> {
    try {
      const todo = this.todoRepository.getTodoByName(name);
      return todo || null;
    } catch (error) {
      throw new Error('Failed to get todo by name');
    }
  }
}

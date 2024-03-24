import { inject, injectable } from 'inversify';
import { ITodoService } from './todo.service.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../config/config.service.interface';
import { TodoModel } from './todo.model';
import { TodoStatus } from '../types/TodoStatus';
import { ITodoRepository } from './todo.repository.interface';
import { IBoardService } from '../boards/board.service.interface';
import { UpdateTodoDto } from '../types/UpdateTodoDto';

@injectable()
export class TodoService implements ITodoService {
  TodoModel: any;
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.TodoRepository) private todoRepository: ITodoRepository,
    @inject(TYPES.BoardService) private boardService: IBoardService,
  ) {}

  async getAllTodos(boardId: string): Promise<TodoModel[]> {
    try {
      const board = await this.boardService.get(boardId);

      const todos = await this.todoRepository.getAllTodos(board!.boardId);

      return todos;
    } catch (error) {
      console.error('Failed to get todos:', error);
      return [];
    }
  }

  async createTodo(
    boardId: string,
    title: string,
    description: string,
  ): Promise<TodoModel | null> {
    try {
      const board = await this.boardService.get(boardId);
      const status = TodoStatus.TODO;

      const todoModel = new TodoModel({
        title,
        status,
        description,
        boardId: board!.boardId,
      });

      const createdTodo: TodoModel =
        await this.todoRepository.createTodo(todoModel);

      return createdTodo;
    } catch (error) {
      console.error('Error creating todo:', error);
      return null;
    }
  }

  async deleteTodo(id: number): Promise<void> {
    try {
      await this.todoRepository.deleteTodo(id);
    } catch (error) {
      throw new Error('Failed to delete todo: ' + error);
    }
  }

  async updateTodo(id: number, updateData: UpdateTodoDto): Promise<void> {
    try {
      await this.todoRepository.updateTodo(id, updateData);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
}

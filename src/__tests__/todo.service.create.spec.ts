import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { ITodoService } from '../todo/todo.service.interface';
import { TYPES } from '../types/types';

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
};

const TodoServiceMock: ITodoService = {
  getAllTodos: jest.fn(),
  createTodo: jest.fn(),
  deleteTodoByName: jest.fn(),
  updateTodoStatus: jest.fn(),
  getTodoByName: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let todoService: ITodoService;

beforeAll(() => {
  container
    .bind<IConfigService>(TYPES.ConfigService)
    .toConstantValue(ConfigServiceMock);
  container
    .bind<ITodoService>(TYPES.TodoService)
    .toConstantValue(TodoServiceMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  todoService = container.get<ITodoService>(TYPES.TodoService);
});

describe('Todo service createTodo', () => {
  it('createTodo', async () => {
    configService.get = jest.fn().mockResolvedValueOnce('1');
    todoService.createTodo = jest
      .fn()
      .mockImplementationOnce((name: string, description: string) => {
        return {
          name,
          description,
        };
      });

    const createdTodo = await todoService.createTodo('Node js', '');

    expect(todoService.createTodo).toHaveBeenCalledWith('Node js', '');
    expect(createdTodo.name).toEqual('Node js');
    expect(createdTodo.description).toEqual('');
  });

  it('should not create a todo if name is not provided', async () => {
    configService.get = jest.fn().mockResolvedValueOnce('1');
    todoService.createTodo = jest
      .fn()
      .mockImplementationOnce((name: string, description: string) => {
        return {
          name,
          description,
        };
      });

    try {
      await todoService.createTodo('', '');
    } catch (error) {
      expect(error).toBe(
        'Name should not be empty and must be a string with maximum length of 100 characters',
      );
    }
  });

  it('should not create a todo if name is too big', async () => {
    configService.get = jest.fn().mockResolvedValueOnce('1');
    todoService.createTodo = jest
      .fn()
      .mockImplementationOnce((name: string, description: string) => {
        return {
          name,
          description,
        };
      });

    const longName = 'a'.repeat(101);

    try {
      await todoService.createTodo(longName, '');
    } catch (error) {
      expect(error).toBe(
        'Name should not be empty and must be a string with maximum length of 100 characters',
      );
    }
  });

  it('should not create a todo if description is too big', async () => {
    configService.get = jest.fn().mockResolvedValueOnce('1');
    todoService.createTodo = jest
      .fn()
      .mockImplementationOnce((name: string, description: string) => {
        return {
          name,
          description,
        };
      });

    const longDescription = 'a'.repeat(251);

    try {
      await todoService.createTodo(longDescription, '');
    } catch (error) {
      expect(error).toBe(
        'Description must be a string with maximum length of 250 characters',
      );
    }
  });
});

import { TodoStatus } from './TodoStatus';

export interface UpdateTodoDto {
  title?: string;
  status?: TodoStatus;
  description?: string;
}

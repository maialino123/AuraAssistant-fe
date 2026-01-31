export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
  categoryId?: string;
}

export interface NewTask {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: number;
  categoryId?: string;
}

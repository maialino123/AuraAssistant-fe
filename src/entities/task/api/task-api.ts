import { Task } from '../model/task-types';
import { mmkvStorage } from '@shared/lib/storage/mmkv-storage';

const TASK_STORAGE_KEY = 'tasks';

const loadTasks = (): Task[] => {
  try {
    const tasksString = mmkvStorage.getString(TASK_STORAGE_KEY);
    return tasksString ? JSON.parse(tasksString) : [];
  } catch (error) {
    console.error('Failed to load tasks from storage', error);
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  try {
    mmkvStorage.set(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to storage', error);
  }
};

export const taskApi = {
  getTasks: (): Promise<Task[]> => {
    return Promise.resolve(loadTasks());
  },
  saveAllTasks: (tasks: Task[]): Promise<void> => {
    saveTasks(tasks);
    return Promise.resolve();
  },
};

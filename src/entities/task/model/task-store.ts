import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task, NewTask, TaskStatus, TaskPriority } from './task-types';
import uuid from 'react-native-uuid';
import { taskApi } from '../api/task-api';

interface TaskState {
  tasks: Task[];
  loadTasks: () => Promise<void>;
  addTask: (newTask: NewTask) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

export const useTaskStore = create<TaskState>()(
  immer((set, get) => ({
    tasks: [], // Initial state, will be loaded from storage
    loadTasks: async () => {
      const storedTasks = await taskApi.getTasks();
      set(state => {
        state.tasks = storedTasks;
      });
    },
    addTask: (newTask) => {
      set((state) => {
        const id = uuid.v4().toString();
        const now = Date.now();
        state.tasks.push({
          id,
          title: newTask.title,
          description: newTask.description || '',
          status: 'todo',
          priority: newTask.priority || 'medium',
          createdAt: now,
          updatedAt: now,
          dueDate: newTask.dueDate,
          categoryId: newTask.categoryId,
        });
        taskApi.saveAllTasks(state.tasks);
      });
    },
    updateTask: (taskId, updates) => {
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) {
          Object.assign(task, { ...updates, updatedAt: Date.now() });
          taskApi.saveAllTasks(state.tasks);
        }
      });
    },
    deleteTask: (taskId) => {
      set((state) => {
        state.tasks = state.tasks.filter((t) => t.id !== taskId);
        taskApi.saveAllTasks(state.tasks);
      });
    },
    getTaskById: (taskId) => {
      return get().tasks.find((t) => t.id === taskId);
    },
    getTasksByStatus: (status) => {
      return get().tasks.filter((t) => t.status === status);
    },
  }))
);

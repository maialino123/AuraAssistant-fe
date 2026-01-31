import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Task, NewTask, TaskStatus, TaskPriority } from './task-types';
import uuid from 'react-native-uuid';

interface TaskState {
  tasks: Task[];
  addTask: (newTask: NewTask) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

export const useTaskStore = create<TaskState>()(
  immer((set, get) => ({
    tasks: [], // Initial state, will be loaded from storage
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
      });
    },
    updateTask: (taskId, updates) => {
      set((state) => {
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) {
          Object.assign(task, { ...updates, updatedAt: Date.now() });
        }
      });
    },
    deleteTask: (taskId) => {
      set((state) => {
        state.tasks = state.tasks.filter((t) => t.id !== taskId);
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

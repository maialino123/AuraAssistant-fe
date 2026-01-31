import { NewTask, Task } from '@entities/task';
import { useTaskStore } from '@entities/task';

// This API layer directly interacts with the Zustand store for now.
// In a real application, this would typically involve API calls to a backend.
export const createTaskApi = {
  createTask: async (newTask: NewTask): Promise<Task> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let createdTask: Task | null = null;
    useTaskStore.setState(state => {
      const id = (Math.random() * 100000).toFixed(0).toString(); // Simplified ID for mock
      const now = Date.now();
      createdTask = {
        id,
        title: newTask.title,
        description: newTask.description || '',
        status: 'todo',
        priority: newTask.priority || 'medium',
        createdAt: now,
        updatedAt: now,
        dueDate: newTask.dueDate,
        categoryId: newTask.categoryId,
      };
      state.tasks.push(createdTask); // Add to store directly
    });

    if (!createdTask) {
      throw new Error('Failed to create task');
    }
    return createdTask;
  },
};

import { useMutation } from '@tanstack/react-query';
import { useTaskStore } from '@entities/task';
import { TaskStatus } from '@entities/task';

interface ToggleStatusArgs {
  taskId: string;
  currentStatus: TaskStatus;
}

export const useCompleteTask = () => {
  return useMutation<void, Error, ToggleStatusArgs>({
    mutationFn: async ({ taskId, currentStatus }) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));

      const newStatus = currentStatus === 'done' ? 'todo' : 'done';
      useTaskStore.getState().updateTask(taskId, { status: newStatus });
    },
    // Optionally, on success, you might want to invalidate queries or refetch data
    // For now, Zustand store handles immediate state update
  });
};

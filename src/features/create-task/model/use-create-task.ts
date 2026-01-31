import { useMutation } from '@tanstack/react-query';
import { createTaskApi } from '../api/create-task-api';
import { NewTask, Task } from '@entities/task';

export const useCreateTask = () => {
  return useMutation<Task, Error, NewTask>({
    mutationFn: (newTask: NewTask) => createTaskApi.createTask(newTask),
    // onSuccess: (newTask) => {
    //   // Optionally, you can invalidate queries or update the cache here
    //   // queryClient.invalidateQueries(['tasks']);
    // },
  });
};

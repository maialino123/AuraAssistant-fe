import React from 'react';
import { Checkbox } from 'react-native-paper';
import { useCompleteTask } from '../model/use-complete-task';
import { TaskStatus } from '@entities/task';

interface CompleteTaskCheckboxProps {
  taskId: string;
  status: TaskStatus;
}

export const CompleteTaskCheckbox = ({ taskId, status }: CompleteTaskCheckboxProps) => {
  const { mutate, isPending } = useCompleteTask();

  const handleToggle = () => {
    mutate({ taskId, currentStatus: status });
  };

  return (
    <Checkbox
      status={status === 'done' ? 'checked' : 'unchecked'}
      onPress={handleToggle}
      disabled={isPending}
    />
  );
};

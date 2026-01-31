import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from '@shared/ui';
import { useCreateTask } from '../model/use-create-task';
import { TaskPriority } from '@entities/task';

interface CreateTaskFormProps {
  onTaskCreated?: () => void;
}

export const CreateTaskForm = ({ onTaskCreated }: CreateTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { mutate, isPending, isSuccess, isError, error } = useCreateTask();

  const handleCreateTask = () => {
    if (title.trim()) {
      mutate(
        { title, description: description || undefined, priority: 'medium' as TaskPriority, /* other fields */ },
        {
          onSuccess: () => {
            setTitle('');
            setDescription('');
            onTaskCreated && onTaskCreated();
          },
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Task Title"
        value={title}
        onChangeText={setTitle}
        placeholder="e.g., Buy groceries"
        error={isError && !title.trim()}
        helperText={isError && !title.trim() ? "Title is required" : undefined}
      />
      <TextInput
        label="Description (Optional)"
        value={description}
        onChangeText={setDescription}
        placeholder="e.g., Milk, eggs, bread"
        multiline
      />
      {/* Add inputs for due date, priority, category here */}
      {isError && <Text style={styles.errorText}>Error: {error?.message}</Text>}
      <Button onPress={handleCreateTask} loading={isPending} disabled={!title.trim()}>
        Create Task
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

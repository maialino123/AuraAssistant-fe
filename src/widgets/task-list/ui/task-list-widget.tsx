import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { TaskCard, TaskStatus } from '@entities/task';
import { useTaskList } from '../model/use-task-list';
import { useCompleteTask } from '@features/complete-task';

interface TaskListWidgetProps {
  statusFilter?: TaskStatus | 'all';
  categoryIdFilter?: string;
  searchTerm?: string;
  onTaskPress?: (taskId: string) => void;
}

export const TaskListWidget = ({
  statusFilter,
  categoryIdFilter,
  searchTerm,
  onTaskPress,
}: TaskListWidgetProps) => {
  const { tasks, loadTasks } = useTaskList({ statusFilter, categoryIdFilter, searchTerm });
  const { mutate: toggleTaskStatus, isPending: isToggling } = useCompleteTask();
  const theme = useTheme();

  useEffect(() => {
    // Load tasks from storage when component mounts
    loadTasks();
  }, [loadTasks]);

  const handleToggleTaskStatus = (taskId: string, currentStatus: TaskStatus) => {
    toggleTaskStatus({ taskId, currentStatus });
  };

  if (tasks.length === 0 && !isToggling) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>No tasks found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onToggleStatus={(id) => handleToggleTaskStatus(id, item.status)}
          onPress={(id) => onTaskPress && onTaskPress(id)}
        />
      )}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={isToggling ? <ActivityIndicator animating={true} style={styles.loader} /> : null}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  loader: {
    marginVertical: 16,
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Checkbox, useTheme } from 'react-native-paper';
import { Card } from '@shared/ui';
import { Task } from '../model/task-types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onPress: (taskId: string) => void;
}

export const TaskCard = ({ task, onToggleStatus, onPress }: TaskCardProps) => {
  const theme = useTheme();
  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date';

  return (
    <Card onPress={() => onPress(task.id)} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Checkbox
            status={task.status === 'done' ? 'checked' : 'unchecked'}
            onPress={() => onToggleStatus(task.id)}
            color={theme.colors.primary}
          />
          <View style={styles.textContainer}>
            <Text
              variant="titleMedium"
              style={[
                styles.title,
                task.status === 'done' && styles.completedTitle,
                { color: theme.colors.onSurface },
              ]}
            >
              {task.title}
            </Text>
            {task.description && (
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {task.description}
              </Text>
            )}
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Due: {formattedDueDate}
            </Text>
          </View>
        </View>
        <View style={styles.rightContent}>
          {/* Priority indicator or other icons can go here */}
          <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {task.priority.toUpperCase()}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 0, // Override default Card margin
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8, // Override default Card padding
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  textContainer: {
    marginLeft: 8,
    flexShrink: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  rightContent: {
    // Styles for priority or other right-aligned items
  },
});

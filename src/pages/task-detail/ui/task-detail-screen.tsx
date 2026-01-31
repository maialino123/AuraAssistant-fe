import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput } from '@shared/ui';
import { HeaderWidget } from '@widgets/header';
import { useTaskStore, TaskStatus, TaskPriority } from '@entities/task';
import { useTheme, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'; // Assuming React Navigation

interface TaskDetailScreenRouteParams {
  id: string;
}

export const TaskDetailScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as TaskDetailScreenRouteParams;

  const getTaskById = useTaskStore(state => state.getTaskById);
  const updateTask = useTaskStore(state => state.updateTask);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const task = getTaskById(id);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(task?.dueDate ? new Date(task.dueDate) : undefined);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    }
  }, [task]);

  const handleSave = () => {
    if (task && title.trim()) {
      updateTask(task.id, {
        title,
        description: description || undefined,
        status,
        priority,
        dueDate: dueDate?.getTime(),
      });
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      navigation.goBack();
    }
  };

  if (!task) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <HeaderWidget title="Task Not Found" showBackAction onBackPress={() => navigation.goBack()} />
        <View style={styles.centerContent}>
          <Text variant="titleMedium" style={{ color: theme.colors.error }}>Task with ID {id} not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HeaderWidget
        title="Task Details"
        showBackAction
        onBackPress={() => navigation.goBack()}
        rightActions={
          <Button mode="text" onPress={handleDelete} compact style={{ marginRight: 8 }}>
            Delete
          </Button>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <TextInput label="Title" value={title} onChangeText={setTitle} />
          <TextInput label="Description" value={description} onChangeText={setDescription} multiline />

          {/* Status Picker */}
          <Text style={styles.label}>Status:</Text>
          <View style={styles.pickerContainer}>
            {['todo', 'in-progress', 'done'].map(s => (
              <Button
                key={s}
                mode={status === s ? 'contained' : 'outlined'}
                onPress={() => setStatus(s as TaskStatus)}
                style={styles.pickerButton}
                labelStyle={styles.pickerButtonLabel}
              >
                {s}
              </Button>
            ))}
          </View>

          {/* Priority Picker */}
          <Text style={styles.label}>Priority:</Text>
          <View style={styles.pickerContainer}>
            {['low', 'medium', 'high'].map(p => (
              <Button
                key={p}
                mode={priority === p ? 'contained' : 'outlined'}
                onPress={() => setPriority(p as TaskPriority)}
                style={styles.pickerButton}
                labelStyle={styles.pickerButtonLabel}
              >
                {p}
              </Button>
            ))}
          </View>

          {/* Due Date Picker (Placeholder) */}
          <Text style={styles.label}>Due Date: {dueDate ? dueDate.toDateString() : 'None'}</Text>
          <Button onPress={() => alert('Implement Date Picker')}>Select Due Date</Button>

          <Button onPress={handleSave} style={styles.saveButton}>
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    paddingBottom: 20,
  },
  label: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 14,
    // fontFamily: theme.fonts.bodySmall.fontFamily,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  pickerButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerButtonLabel: {
    fontSize: 12,
  },
  saveButton: {
    marginTop: 20,
  },
});

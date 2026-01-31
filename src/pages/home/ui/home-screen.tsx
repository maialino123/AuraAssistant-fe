import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TaskListWidget } from '@widgets/task-list';
import { CreateTaskForm } from '@features/create-task';
import { HeaderWidget } from '@widgets/header';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <HeaderWidget title="AuraAssistant" subtitle="Your Tasks" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CreateTaskForm />
        <TaskListWidget />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

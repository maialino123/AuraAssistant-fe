import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { HomeScreen } from '../ui/home-screen';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock child components that might have complex logic or dependencies
jest.mock('@widgets/task-list', () => ({
  TaskListWidget: () => screen.getByTestId('TaskListWidget'),
}));
jest.mock('@features/create-task', () => ({
  CreateTaskForm: () => screen.getByTestId('CreateTaskForm'),
}));
jest.mock('@widgets/header', () => ({
  HeaderWidget: () => screen.getByTestId('HeaderWidget'),
}));

// Mock useTheme from react-native-paper
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      colors: {
        background: '#f6f6f6',
      },
    }),
  };
});


describe('HomeScreen', () => {
  it('renders header, create task form, and task list widget', () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <HomeScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    // Check if the mocked components are rendered
    expect(screen.getByTestId('HeaderWidget')).toBeOnTheScreen();
    expect(screen.getByTestId('CreateTaskForm')).toBeOnTheScreen();
    expect(screen.getByTestId('TaskListWidget')).toBeOnTheScreen();
  });
});

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import { TaskListWidget } from '../ui/task-list-widget';
import { useTaskList } from '../model/use-task-list';
import { useCompleteTask } from '@features/complete-task';
import { PaperProvider } from 'react-native-paper';
import { TaskStatus, Task } from '@entities/task';

// Mock the hooks
jest.mock('../model/use-task-list');
jest.mock('@features/complete-task');

// Mock react-native-paper's useTheme
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      colors: {
        primary: '#6200EE',
        onSurface: '#000000',
        onSurfaceVariant: '#666666',
        primaryContainer: '#EADDFF',
        onPrimaryContainer: '#21005D',
      },
    }),
  };
});


describe('TaskListWidget', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', status: 'todo' as TaskStatus, priority: 'medium', createdAt: Date.now(), updatedAt: Date.now() },
    { id: '2', title: 'Task 2', status: 'done' as TaskStatus, priority: 'high', createdAt: Date.now(), updatedAt: Date.now() },
  ];
  const mockLoadTasks = jest.fn();
  const mockToggleTaskStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTaskList as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      loadTasks: mockLoadTasks,
    });
    (useCompleteTask as jest.Mock).mockReturnValue({
      mutate: mockToggleTaskStatus,
      isPending: false,
    });
  });

  it('renders tasks correctly', () => {
    render(
      <PaperProvider>
        <TaskListWidget />
      </PaperProvider>
    );
    expect(screen.getByText('Task 1')).toBeOnTheScreen();
    expect(screen.getByText('Task 2')).toBeOnTheScreen();
  });

  it('calls loadTasks on mount', () => {
    render(
      <PaperProvider>
        <TaskListWidget />
      </PaperProvider>
    );
    expect(mockLoadTasks).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleStatus from TaskCard', () => {
    render(
      <PaperProvider>
        <TaskListWidget />
      </PaperProvider>
    );
    fireEvent.press(screen.getAllByRole('checkbox')[0]);
    expect(mockToggleTaskStatus).toHaveBeenCalledWith({ taskId: '1', currentStatus: 'todo' });
  });

  it('calls onTaskPress when task card is pressed', () => {
    const mockOnTaskPress = jest.fn();
    render(
      <PaperProvider>
        <TaskListWidget onTaskPress={mockOnTaskPress} />
      </PaperProvider>
    );
    fireEvent.press(screen.getByText('Task 1'));
    expect(mockOnTaskPress).toHaveBeenCalledWith('1');
  });

  it('renders "No tasks found" message when tasks array is empty', () => {
    (useTaskList as jest.Mock).mockReturnValue({
      tasks: [],
      loadTasks: mockLoadTasks,
    });
    render(
      <PaperProvider>
        <TaskListWidget />
      </PaperProvider>
    );
    expect(screen.getByText('No tasks found.')).toBeOnTheScreen();
  });

  it('shows ActivityIndicator when toggling task status is pending', () => {
    (useCompleteTask as jest.Mock).mockReturnValue({
      mutate: mockToggleTaskStatus,
      isPending: true,
    });
    render(
      <PaperProvider>
        <TaskListWidget />
      </PaperProvider>
    );
    expect(screen.getByTestId('activity-indicator')).toBeOnTheScreen(); // Assumes ActivityIndicator has testID="activity-indicator"
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { TaskDetailScreen } from '../ui/task-detail-screen';
import { useTaskStore } from '@entities/task';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from 'expo-router'; // Mock Expo Router navigation

// Mock Expo Router hooks
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
  Stack: { Screen: () => null }, // Mock Stack.Screen if used directly
}));

// Mock useTheme from react-native-paper
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      colors: {
        background: '#f6f6f6',
        onSurface: '#000000',
        onSurfaceVariant: '#666666',
        error: '#B00020',
      },
      fonts: {
        bodySmall: { fontFamily: 'Roboto' }
      }
    }),
    Text: ActualPaper.Text, // Ensure Text component is the actual one
    Switch: ActualPaper.Switch,
  };
});


describe('TaskDetailScreen', () => {
  const mockGoBack = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockGetTaskById = jest.fn();

  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo' as 'todo',
    priority: 'medium' as 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ goBack: mockGoBack });
    (useRoute as jest.Mock).mockReturnValue({ params: { id: '1' } });
    (useTaskStore as jest.Mock).mockImplementation((selector) =>
      selector({
        getTaskById: mockGetTaskById,
        updateTask: mockUpdateTask,
        deleteTask: mockDeleteTask,
      })
    );
    mockGetTaskById.mockReturnValue(mockTask);
  });

  it('renders task details correctly', () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <TaskDetailScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    expect(screen.getByDisplayValue('Test Task')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('Test Description')).toBeOnTheScreen();
    expect(screen.getByText('todo')).toBeOnTheScreen();
    expect(screen.getByText('medium')).toBeOnTheScreen();
  });

  it('calls updateTask and navigates back on save', async () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <TaskDetailScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    fireEvent.changeText(screen.getByLabelText('Title'), 'Updated Title');
    fireEvent.press(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith('1', expect.objectContaining({ title: 'Updated Title' }));
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });
  });

  it('calls deleteTask and navigates back on delete', async () => {
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <TaskDetailScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );

    fireEvent.press(screen.getByText('Delete'));

    await waitFor(() => {
      expect(mockDeleteTask).toHaveBeenCalledWith('1');
      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });
  });

  it('renders "Task Not Found" if task does not exist', () => {
    mockGetTaskById.mockReturnValue(undefined);
    render(
      <SafeAreaProvider>
        <PaperProvider>
          <TaskDetailScreen />
        </PaperProvider>
      </SafeAreaProvider>
    );
    expect(screen.getByText('Task Not Found')).toBeOnTheScreen();
    expect(screen.getByText('Task with ID 1 not found.')).toBeOnTheScreen();
  });
});

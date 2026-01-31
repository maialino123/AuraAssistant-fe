import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskCard } from '../ui/task-card';
import { Task } from '../model/task-types';
import { PaperProvider } from 'react-native-paper'; // Import PaperProvider for context

// Mock date-fns
jest.mock('date-fns', () => ({
  format: jest.fn((date, formatStr) => 'Jan 01, 2026'),
}));

// Mock useTheme from react-native-paper
jest.mock('react-native-paper', () => {
  const RealModule = jest.requireActual('react-native-paper');
  return {
    ...RealModule,
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


describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'This is a test description',
    status: 'todo',
    priority: 'medium',
    createdAt: 1672531200000, // Jan 1, 2023
    updatedAt: 1672531200000,
    dueDate: 1704067200000, // Jan 1, 2024
  };

  it('renders task title and description', () => {
    render(
      <PaperProvider>
        <TaskCard task={mockTask} onToggleStatus={jest.fn()} onPress={jest.fn()} />
      </PaperProvider>
    );
    expect(screen.getByText('Test Task')).toBeOnTheScreen();
    expect(screen.getByText('This is a test description')).toBeOnTheScreen();
    expect(screen.getByText('Due: Jan 01, 2026')).toBeOnTheScreen();
  });

  it('calls onToggleStatus when checkbox is pressed', () => {
    const onToggleStatusMock = jest.fn();
    render(
      <PaperProvider>
        <TaskCard task={mockTask} onToggleStatus={onToggleStatusMock} onPress={jest.fn()} />
      </PaperProvider>
    );
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onToggleStatusMock).toHaveBeenCalledWith('1');
  });

  it('calls onPress when card is pressed', () => {
    const onPressMock = jest.fn();
    render(
      <PaperProvider>
        <TaskCard task={mockTask} onToggleStatus={jest.fn()} onPress={onPressMock} />
      </PaperProvider>
    );
    fireEvent.press(screen.getByText('Test Task')); // Pressing on the title usually triggers card press
    expect(onPressMock).toHaveBeenCalledWith('1');
  });

  it('renders completed task with line-through', () => {
    const completedTask = { ...mockTask, status: 'done' as TaskStatus };
    render(
      <PaperProvider>
        <TaskCard task={completedTask} onToggleStatus={jest.fn()} onPress={jest.fn()} />
      </PaperProvider>
    );
    const titleElement = screen.getByText('Test Task');
    expect(titleElement.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ textDecorationLine: 'line-through' })]));
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { CreateTaskForm } from '../ui/create-task-form';
import { useCreateTask } from '../model/use-create-task';
import { PaperProvider } from 'react-native-paper'; // For PaperProvider context

// Mock the useCreateTask hook
jest.mock('../model/use-create-task', () => ({
  useCreateTask: jest.fn(),
}));

// Mock react-native-paper's useTheme
jest.mock('react-native-paper', () => {
  const ActualPaper = jest.requireActual('react-native-paper');
  return {
    ...ActualPaper,
    useTheme: () => ({
      colors: {
        primary: '#6200EE',
        accent: '#03DAC4',
        background: '#f6f6f6',
        surface: '#ffffff',
        text: '#000000',
        onSurface: '#000000',
        onBackground: '#000000',
        error: '#B00020',
      },
    }),
  };
});


describe('CreateTaskForm', () => {
  const mockMutate = jest.fn();
  const mockOnTaskCreated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateTask as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    });
  });

  it('renders correctly', () => {
    render(
      <PaperProvider>
        <CreateTaskForm />
      </PaperProvider>
    );
    expect(screen.getByLabelText('Task Title')).toBeOnTheScreen();
    expect(screen.getByText('Create Task')).toBeOnTheScreen();
  });

  it('updates title and description fields', () => {
    render(
      <PaperProvider>
        <CreateTaskForm />
      </PaperProvider>
    );
    fireEvent.changeText(screen.getByLabelText('Task Title'), 'New Title');
    fireEvent.changeText(screen.getByLabelText('Description (Optional)'), 'New Description');

    expect(screen.getByDisplayValue('New Title')).toBeOnTheScreen();
    expect(screen.getByDisplayValue('New Description')).toBeOnTheScreen();
  });

  it('calls mutate with correct data and resets fields on success', async () => {
    (useCreateTask as jest.Mock).mockReturnValue({
      mutate: (data: any, options: any) => {
        mockMutate(data, options);
        options.onSuccess(); // Manually trigger onSuccess
      },
      isPending: false,
      isSuccess: true,
      isError: false,
      error: null,
    });

    render(
      <PaperProvider>
        <CreateTaskForm onTaskCreated={mockOnTaskCreated} />
      </PaperProvider>
    );

    fireEvent.changeText(screen.getByLabelText('Task Title'), 'New Task');
    fireEvent.press(screen.getByText('Create Task'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { title: 'New Task', description: undefined, priority: 'medium' },
        expect.any(Object)
      );
    });

    expect(screen.getByLabelText('Task Title').props.value).toBe('');
    expect(screen.getByLabelText('Description (Optional)').props.value).toBe('');
    expect(mockOnTaskCreated).toHaveBeenCalledTimes(1);
  });

  it('shows error message if title is empty', async () => {
    (useCreateTask as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: true,
      error: new Error('Title is required'),
    });

    render(
      <PaperProvider>
        <CreateTaskForm />
      </PaperProvider>
    );

    fireEvent.press(screen.getByText('Create Task'));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeOnTheScreen();
    });
  });

  it('disables button when title is empty', () => {
    render(
      <PaperProvider>
        <CreateTaskForm />
      </PaperProvider>
    );
    expect(screen.getByText('Create Task')).toBeDisabled();
  });

  it('enables button when title is not empty', () => {
    render(
      <PaperProvider>
        <CreateTaskForm />
      </PaperProvider>
    );
    fireEvent.changeText(screen.getByLabelText('Task Title'), 'New Title');
    expect(screen.getByText('Create Task')).not.toBeDisabled();
  });
});

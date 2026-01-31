import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CompleteTaskCheckbox } from '../ui/complete-task-checkbox';
import { useCompleteTask } from '../model/use-complete-task';
import { PaperProvider } from 'react-native-paper'; // For PaperProvider context

// Mock the useCompleteTask hook
jest.mock('../model/use-complete-task', () => ({
  useCompleteTask: jest.fn(),
}));

describe('CompleteTaskCheckbox', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCompleteTask as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  it('renders unchecked when status is "todo"', () => {
    render(
      <PaperProvider>
        <CompleteTaskCheckbox taskId="1" status="todo" />
      </PaperProvider>
    );
    expect(screen.getByRole('checkbox')).toHaveProp('status', 'unchecked');
  });

  it('renders checked when status is "done"', () => {
    render(
      <PaperProvider>
        <CompleteTaskCheckbox taskId="1" status="done" />
      </PaperProvider>
    );
    expect(screen.getByRole('checkbox')).toHaveProp('status', 'checked');
  });

  it('calls mutate with correct arguments on press', () => {
    render(
      <PaperProvider>
        <CompleteTaskCheckbox taskId="1" status="todo" />
      </PaperProvider>
    );
    fireEvent.press(screen.getByRole('checkbox'));
    expect(mockMutate).toHaveBeenCalledWith({ taskId: '1', currentStatus: 'todo' });
  });

  it('disables checkbox when pending', () => {
    (useCompleteTask as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
    });
    render(
      <PaperProvider>
        <CompleteTaskCheckbox taskId="1" status="todo" />
      </PaperProvider>
    );
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});

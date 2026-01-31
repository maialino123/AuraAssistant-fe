import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useCompleteTask } from '../model/use-complete-task';
import { useTaskStore, TaskStatus } from '@entities/task';

// Mock the zustand store to control its state directly
jest.mock('@entities/task', () => ({
  ...jest.requireActual('@entities/task'),
  useTaskStore: {
    getState: () => ({
      tasks: [
        { id: '1', title: 'Task 1', status: 'todo' as TaskStatus, priority: 'medium', createdAt: Date.now(), updatedAt: Date.now() },
        { id: '2', title: 'Task 2', status: 'done' as TaskStatus, priority: 'medium', createdAt: Date.now(), updatedAt: Date.now() },
      ],
      updateTask: jest.fn(),
    }),
    setState: jest.fn(), // Mock setState as well if needed
  },
}));

describe('useCompleteTask', () => {
  const mockUpdateTask = useTaskStore.getState().updateTask as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle task status from todo to done', async () => {
    const { result } = renderHook(() => useCompleteTask());

    act(() => {
      result.current.mutate({ taskId: '1', currentStatus: 'todo' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdateTask).toHaveBeenCalledWith('1', { status: 'done' });
  });

  it('should toggle task status from done to todo', async () => {
    const { result } = renderHook(() => useCompleteTask());

    act(() => {
      result.current.mutate({ taskId: '2', currentStatus: 'done' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdateTask).toHaveBeenCalledWith('2', { status: 'todo' });
  });

  it('should handle pending state', () => {
    (useCompleteTask as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
    });
    const { result } = renderHook(() => useCompleteTask());
    expect(result.current.isPending).toBe(true);
  });
});

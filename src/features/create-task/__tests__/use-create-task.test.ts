import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useCreateTask } from '../model/use-create-task';
import { createTaskApi } from '../api/create-task-api';
import { useTaskStore } from '@entities/task';

// Mock the API interaction
jest.mock('../api/create-task-api', () => ({
  createTaskApi: {
    createTask: jest.fn(),
  },
}));

// Mock the zustand store to control its state directly
jest.mock('@entities/task', () => ({
  ...jest.requireActual('@entities/task'), // Import and retain actual Task related exports
  useTaskStore: {
    getState: jest.fn(() => ({
      tasks: [],
      addTask: jest.fn(),
    })),
    setState: jest.fn(),
  },
}));

describe('useCreateTask', () => {
  const mockCreateTask = createTaskApi.createTask as jest.Mock;
  const mockAddTask = useTaskStore.getState().addTask as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAddTask.mockImplementation((task) => {
      // Simulate adding to an internal array if needed for more complex tests
      // For this simple mock, we just ensure it's called
    });
  });

  it('should create a task successfully', async () => {
    const newTask = { title: 'Test Task' };
    const createdTask = { id: 'mock-id', ...newTask, status: 'todo', priority: 'medium', createdAt: Date.now(), updatedAt: Date.now() };
    mockCreateTask.mockResolvedValue(createdTask);

    const { result } = renderHook(() => useCreateTask());

    act(() => {
      result.current.mutate(newTask);
    });

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockCreateTask).toHaveBeenCalledWith(newTask);
    expect(result.current.data).toEqual(createdTask);
  });

  it('should handle creation error', async () => {
    const newTask = { title: 'Error Task' };
    const errorMessage = 'Failed to create task';
    mockCreateTask.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCreateTask());

    act(() => {
      result.current.mutate(newTask);
    });

    expect(result.current.isPending).toBe(true);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe(errorMessage);
  });
});

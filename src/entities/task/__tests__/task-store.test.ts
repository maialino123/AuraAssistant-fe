import { act, renderHook } from '@testing-library/react-native';
import { useTaskStore } from '../model/task-store';
import { TaskStatus, TaskPriority } from '../model/task-types';

// Mock react-native-uuid
jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-123'),
}));

describe('useTaskStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useTaskStore.setState({ tasks: [] });
    jest.clearAllMocks();
  });

  it('should add a new task', () => {
    const { result } = renderHook(() => useTaskStore());
    const initialTaskCount = result.current.tasks.length;

    act(() => {
      result.current.addTask({ title: 'New Task', description: 'Test description' });
    });

    expect(result.current.tasks.length).toBe(initialTaskCount + 1);
    const addedTask = result.current.tasks[0];
    expect(addedTask.title).toBe('New Task');
    expect(addedTask.description).toBe('Test description');
    expect(addedTask.status).toBe('todo');
    expect(addedTask.priority).toBe('medium');
    expect(addedTask.id).toBe('mock-uuid-123');
  });

  it('should update an existing task', () => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.addTask({ title: 'Task to Update' });
    });
    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.updateTask(taskId, { status: 'done', priority: 'high' });
    });

    const updatedTask = result.current.getTaskById(taskId);
    expect(updatedTask?.status).toBe('done');
    expect(updatedTask?.priority).toBe('high');
    expect(updatedTask?.updatedAt).toBeGreaterThan(updatedTask?.createdAt || 0);
  });

  it('should delete a task', () => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.addTask({ title: 'Task to Delete' });
    });
    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks.length).toBe(0);
    expect(result.current.getTaskById(taskId)).toBeUndefined();
  });

  it('should get a task by ID', () => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.addTask({ title: 'Find Me' });
    });
    const taskId = result.current.tasks[0].id;

    const foundTask = result.current.getTaskById(taskId);
    expect(foundTask?.title).toBe('Find Me');
  });

  it('should get tasks by status', () => {
    const { result } = renderHook(() => useTaskStore());
    act(() => {
      result.current.addTask({ title: 'Task 1', priority: 'high' });
      result.current.addTask({ title: 'Task 2', priority: 'medium' });
      result.current.addTask({ title: 'Task 3', priority: 'low' });
      result.current.updateTask(result.current.tasks[0].id, { status: 'done' });
      result.current.updateTask(result.current.tasks[1].id, { status: 'in-progress' });
    });

    const todoTasks = result.current.getTasksByStatus('todo');
    expect(todoTasks.length).toBe(1);
    expect(todoTasks[0].title).toBe('Task 3');

    const doneTasks = result.current.getTasksByStatus('done');
    expect(doneTasks.length).toBe(1);
    expect(doneTasks[0].title).toBe('Task 1');
  });
});

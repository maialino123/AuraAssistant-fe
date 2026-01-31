import { act, renderHook } from '@testing-library/react-native';
import { useTaskList } from '../model/use-task-list';
import { useTaskStore, TaskStatus, TaskPriority, Task } from '@entities/task';

// Mock the zustand store to control its state directly
jest.mock('@entities/task', () => ({
  ...jest.requireActual('@entities/task'), // Import and retain actual Task related exports
  useTaskStore: jest.fn(), // Mock the hook itself
}));

describe('useTaskList', () => {
  const mockTasks: Task[] = [
    { id: '1', title: 'Task A', description: 'Desc A', status: 'todo', priority: 'high', createdAt: 100, updatedAt: 100, dueDate: 200 },
    { id: '2', title: 'Task B', description: 'Desc B', status: 'todo', priority: 'medium', createdAt: 110, updatedAt: 110, dueDate: 190 },
    { id: '3', title: 'Task C', description: 'Desc C', status: 'done', priority: 'low', createdAt: 120, updatedAt: 120, dueDate: 210 },
    { id: '4', title: 'Task D', description: 'Desc D', status: 'todo', priority: 'high', createdAt: 90, updatedAt: 90, dueDate: 220 },
  ];

  const mockLoadTasks = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTaskStore as jest.Mock).mockImplementation(selector => selector({ tasks: mockTasks, loadTasks: mockLoadTasks }));
  });

  it('should return all tasks when no filters are applied', () => {
    const { result } = renderHook(() => useTaskList());
    expect(result.current.tasks.length).toBe(mockTasks.length);
    expect(result.current.tasks[0].id).toBe('1'); // Should be sorted
  });

  it('should filter tasks by status', () => {
    const { result } = renderHook(() => useTaskList({ statusFilter: 'todo' }));
    expect(result.current.tasks.length).toBe(3);
    expect(result.current.tasks.every(t => t.status === 'todo')).toBe(true);
  });

  it('should filter tasks by category', () => {
    const tasksWithCategory = [
      ...mockTasks,
      { id: '5', title: 'Task E', status: 'todo', priority: 'medium', createdAt: 130, updatedAt: 130, categoryId: 'cat-a' },
    ];
    (useTaskStore as jest.Mock).mockImplementation(selector => selector({ tasks: tasksWithCategory, loadTasks: mockLoadTasks }));

    const { result } = renderHook(() => useTaskList({ categoryIdFilter: 'cat-a' }));
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].id).toBe('5');
  });

  it('should filter tasks by search term in title or description', () => {
    const { result } = renderHook(() => useTaskList({ searchTerm: 'desc b' }));
    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].id).toBe('2');

    act(() => {
      result.current.setSearchTerm('task a'); // This setter is not exposed by useTaskList hook
    });
    // Re-rendering with new options manually
    const { result: newResult } = renderHook(() => useTaskList({ searchTerm: 'task a' }));
    expect(newResult.current.tasks.length).toBe(1);
    expect(newResult.current.tasks[0].id).toBe('1');
  });

  it('should sort tasks: incomplete first, then priority, then due date, then creation date', () => {
    const { result } = renderHook(() => useTaskList());
    const sortedIds = result.current.tasks.map(t => t.id);
    // Expected order: 1 (todo, high, 200), 4 (todo, high, 220), 2 (todo, medium, 190), 3 (done, low, 210)
    // Note: DueDate is ascending, Priority is descending
    expect(sortedIds).toEqual(['1', '4', '2', '3']);
  });

  it('should call loadTasks on mount', () => {
    renderHook(() => useTaskList());
    expect(mockLoadTasks).toHaveBeenCalledTimes(1);
  });
});

import { act, renderHook } from '@testing-library/react-native';
import { useSearchTasks } from '../model/use-search-tasks';
import { useTaskStore, TaskStatus, TaskPriority } from '@entities/task';

// Mock the zustand store to control its state directly
jest.mock('@entities/task', () => ({
  ...jest.requireActual('@entities/task'),
  useTaskStore: jest.fn(), // Mock the hook itself
}));

describe('useSearchTasks', () => {
  const mockTasks = [
    { id: '1', title: 'Buy groceries', description: 'Milk, bread, eggs', status: 'todo' as TaskStatus, priority: 'medium' as TaskPriority, createdAt: Date.now(), updatedAt: Date.now() },
    { id: '2', title: 'Walk the dog', description: 'After work', status: 'todo' as TaskStatus, priority: 'medium' as TaskPriority, createdAt: Date.now(), updatedAt: Date.now() },
    { id: '3', title: 'Pay bills', description: 'Electricity and water', status: 'done' as TaskStatus, priority: 'high' as TaskPriority, createdAt: Date.now(), updatedAt: Date.now() },
  ];

  beforeEach(() => {
    (useTaskStore as jest.Mock).mockReturnValue(mockTasks); // Mock the selector directly
  });

  it('should return all tasks if search term is empty', () => {
    const { result } = renderHook(() => useSearchTasks());
    expect(result.current.filteredTasks).toEqual(mockTasks);
  });

  it('should filter tasks by title', () => {
    const { result } = renderHook(() => useSearchTasks());

    act(() => {
      result.current.setSearchTerm('groceries');
    });

    expect(result.current.filteredTasks).toEqual([mockTasks[0]]);
  });

  it('should filter tasks by description', () => {
    const { result } = renderHook(() => useSearchTasks());

    act(() => {
      result.current.setSearchTerm('after work');
    });

    expect(result.current.filteredTasks).toEqual([mockTasks[1]]);
  });

  it('should be case-insensitive', () => {
    const { result } = renderHook(() => useSearchTasks());

    act(() => {
      result.current.setSearchTerm('BILLS');
    });

    expect(result.current.filteredTasks).toEqual([mockTasks[2]]);
  });

  it('should return empty array if no matches', () => {
    const { result } = renderHook(() => useSearchTasks());

    act(() => {
      result.current.setSearchTerm('nonexistent');
    });

    expect(result.current.filteredTasks).toEqual([]);
  });
});

import { useTaskStore, Task, TaskStatus } from '@entities/task';
import { useMemo } from 'react';

interface UseTaskListOptions {
  statusFilter?: TaskStatus | 'all';
  categoryIdFilter?: string;
  searchTerm?: string;
}

export const useTaskList = (options?: UseTaskListOptions) => {
  const allTasks = useTaskStore(state => state.tasks);
  const loadTasks = useTaskStore(state => state.loadTasks);

  const filteredTasks = useMemo(() => {
    let tasksToFilter = allTasks;

    // Filter by status
    if (options?.statusFilter && options.statusFilter !== 'all') {
      tasksToFilter = tasksToFilter.filter(task => task.status === options.statusFilter);
    }

    // Filter by category
    if (options?.categoryIdFilter) {
      tasksToFilter = tasksToFilter.filter(task => task.categoryId === options.categoryIdFilter);
    }

    // Filter by search term
    if (options?.searchTerm) {
      const lowerCaseSearchTerm = options.searchTerm.toLowerCase();
      tasksToFilter = tasksToFilter.filter(task =>
        task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        task.description?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Sort tasks (e.g., incomplete first, then by due date or priority)
    return tasksToFilter.sort((a, b) => {
      // Prioritize incomplete tasks
      if (a.status === 'done' && b.status !== 'done') return 1;
      if (b.status === 'done' && a.status !== 'done') return -1;

      // Then by priority (high > medium > low)
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
      if (priorityOrder[a.priority] < priorityOrder[b.priority]) return -1;
      if (priorityOrder[a.priority] > priorityOrder[b.priority]) return 1;

      // Then by due date
      if (a.dueDate && b.dueDate) return a.dueDate - b.dueDate;
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Finally by creation date
      return b.createdAt - a.createdAt;
    });
  }, [allTasks, options?.statusFilter, options?.categoryIdFilter, options?.searchTerm]);

  return {
    tasks: filteredTasks,
    loadTasks,
  };
};

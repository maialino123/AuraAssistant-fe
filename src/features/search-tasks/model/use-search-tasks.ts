import { useState, useMemo } from 'react';
import { useTaskStore, Task } from '@entities/task';

export const useSearchTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const allTasks = useTaskStore(state => state.tasks);

  const filteredTasks = useMemo(() => {
    if (!searchTerm) {
      return allTasks;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allTasks.filter(task =>
      task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      task.description?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [allTasks, searchTerm]);

  return { searchTerm, setSearchTerm, filteredTasks };
};

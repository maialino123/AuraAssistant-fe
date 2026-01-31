import { act, renderHook } from '@testing-library/react-native';
import { useCategoryStore } from '../model/category-store';

// Mock react-native-uuid
jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-cat-123'),
}));

describe('useCategoryStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCategoryStore.setState({ categories: [] });
    jest.clearAllMocks();
  });

  it('should add a new category', () => {
    const { result } = renderHook(() => useCategoryStore());
    const initialCategoryCount = result.current.categories.length;

    act(() => {
      result.current.addCategory({ name: 'Work', color: '#FF0000' });
    });

    expect(result.current.categories.length).toBe(initialCategoryCount + 1);
    const addedCategory = result.current.categories[0];
    expect(addedCategory.name).toBe('Work');
    expect(addedCategory.color).toBe('#FF0000');
    expect(addedCategory.id).toBe('mock-uuid-cat-123');
  });

  it('should update an existing category', () => {
    const { result } = renderHook(() => useCategoryStore());
    act(() => {
      result.current.addCategory({ name: 'Personal' });
    });
    const categoryId = result.current.categories[0].id;

    act(() => {
      result.current.updateCategory(categoryId, { name: 'Family', color: '#0000FF' });
    });

    const updatedCategory = result.current.getCategoryById(categoryId);
    expect(updatedCategory?.name).toBe('Family');
    expect(updatedCategory?.color).toBe('#0000FF');
    expect(updatedCategory?.updatedAt).toBeGreaterThan(updatedCategory?.createdAt || 0);
  });

  it('should delete a category', () => {
    const { result } = renderHook(() => useCategoryStore());
    act(() => {
      result.current.addCategory({ name: 'Shopping' });
    });
    const categoryId = result.current.categories[0].id;

    act(() => {
      result.current.deleteCategory(categoryId);
    });

    expect(result.current.categories.length).toBe(0);
    expect(result.current.getCategoryById(categoryId)).toBeUndefined();
  });

  it('should get a category by ID', () => {
    const { result } = renderHook(() => useCategoryStore());
    act(() => {
      result.current.addCategory({ name: 'Important' });
    });
    const categoryId = result.current.categories[0].id;

    const foundCategory = result.current.getCategoryById(categoryId);
    expect(foundCategory?.name).toBe('Important');
  });
});

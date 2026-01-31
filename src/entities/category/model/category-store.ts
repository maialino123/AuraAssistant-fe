import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Category, NewCategory } from './category-types';
import uuid from 'react-native-uuid';
import { categoryApi } from '../api/category-api';

interface CategoryState {
  categories: Category[];
  loadCategories: () => Promise<void>;
  addCategory: (newCategory: NewCategory) => void;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  deleteCategory: (categoryId: string) => void;
  getCategoryById: (categoryId: string) => Category | undefined;
}

export const useCategoryStore = create<CategoryState>()(
  immer((set, get) => ({
    categories: [], // Initial state, will be loaded from storage
    loadCategories: async () => {
      const storedCategories = await categoryApi.getCategories();
      set(state => {
        state.categories = storedCategories;
      });
    },
    addCategory: (newCategory) => {
      set((state) => {
        const id = uuid.v4().toString();
        const now = Date.now();
        state.categories.push({
          id,
          name: newCategory.name,
          color: newCategory.color,
          createdAt: now,
          updatedAt: now,
        });
        categoryApi.saveAllCategories(state.categories);
      });
    },
    updateCategory: (categoryId, updates) => {
      set((state) => {
        const category = state.categories.find((c) => c.id === categoryId);
        if (category) {
          Object.assign(category, { ...updates, updatedAt: Date.now() });
          categoryApi.saveAllCategories(state.categories);
        }
      });
    },
    deleteCategory: (categoryId) => {
      set((state) => {
        state.categories = state.categories.filter((c) => c.id !== categoryId);
        categoryApi.saveAllCategories(state.categories);
      });
    },
    getCategoryById: (categoryId) => {
      return get().categories.find((c) => c.id === categoryId);
    },
  }))
);

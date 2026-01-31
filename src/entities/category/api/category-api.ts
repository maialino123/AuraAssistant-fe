import { Category } from '../model/category-types';
import { mmkvStorage } from '@shared/lib/storage/mmkv-storage';

const CATEGORY_STORAGE_KEY = 'categories';

const loadCategories = (): Category[] => {
  try {
    const categoriesString = mmkvStorage.getString(CATEGORY_STORAGE_KEY);
    return categoriesString ? JSON.parse(categoriesString) : [];
  } catch (error) {
    console.error('Failed to load categories from storage', error);
    return [];
  }
};

const saveCategories = (categories: Category[]) => {
  try {
    mmkvStorage.set(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories to storage', error);
  }
};

export const categoryApi = {
  getCategories: (): Promise<Category[]> => {
    return Promise.resolve(loadCategories());
  },
  saveAllCategories: (categories: Category[]): Promise<void> => {
    saveCategories(categories);
    return Promise.resolve();
  },
};

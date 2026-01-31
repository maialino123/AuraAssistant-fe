import { Note } from '../model/note-types';
import { mmkvStorage } from '@shared/lib/storage/mmkv-storage';

const NOTE_STORAGE_KEY = 'notes';

const loadNotes = (): Note[] => {
  try {
    const notesString = mmkvStorage.getString(NOTE_STORAGE_KEY);
    return notesString ? JSON.parse(notesString) : [];
  } catch (error) {
    console.error('Failed to load notes from storage', error);
    return [];
  }
};

const saveNotes = (notes: Note[]) => {
  try {
    mmkvStorage.set(NOTE_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes to storage', error);
  }
};

export const noteApi = {
  getNotes: (): Promise<Note[]> => {
    return Promise.resolve(loadNotes());
  },
  saveAllNotes: (notes: Note[]): Promise<void> => {
    saveNotes(notes);
    return Promise.resolve();
  },
};

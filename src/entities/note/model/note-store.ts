import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Note, NewNote } from './note-types';
import uuid from 'react-native-uuid';
import { noteApi } from '../api/note-api'; // Assuming noteApi will be created

interface NoteState {
  notes: Note[];
  loadNotes: () => Promise<void>;
  addNote: (newNote: NewNote) => void;
  updateNote: (noteId: string, updates: Partial<Note>) => void;
  deleteNote: (noteId: string) => void;
  getNoteById: (noteId: string) => Note | undefined;
  getNotesByCategoryId: (categoryId: string) => Note[];
}

export const useNoteStore = create<NoteState>()(
  immer((set, get) => ({
    notes: [], // Initial state, will be loaded from storage
    loadNotes: async () => {
      const storedNotes = await noteApi.getNotes();
      set(state => {
        state.notes = storedNotes;
      });
    },
    addNote: (newNote) => {
      set((state) => {
        const id = uuid.v4().toString();
        const now = Date.now();
        state.notes.push({
          id,
          title: newNote.title,
          content: newNote.content,
          createdAt: now,
          updatedAt: now,
          categoryId: newNote.categoryId,
        });
        noteApi.saveAllNotes(state.notes);
      });
    },
    updateNote: (noteId, updates) => {
      set((state) => {
        const note = state.notes.find((n) => n.id === noteId);
        if (note) {
          Object.assign(note, { ...updates, updatedAt: Date.now() });
          noteApi.saveAllNotes(state.notes);
        }
      });
    },
    deleteNote: (noteId) => {
      set((state) => {
        state.notes = state.notes.filter((n) => n.id !== noteId);
        noteApi.saveAllNotes(state.notes);
      });
    },
    getNoteById: (noteId) => {
      return get().notes.find((n) => n.id === noteId);
    },
    getNotesByCategoryId: (categoryId) => {
      return get().notes.filter((n) => n.categoryId === categoryId);
    },
  }))
);

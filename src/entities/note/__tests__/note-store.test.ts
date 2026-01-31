import { act, renderHook } from '@testing-library/react-native';
import { useNoteStore } from '../model/note-store';

// Mock react-native-uuid
jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-note-123'),
}));

describe('useNoteStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useNoteStore.setState({ notes: [] });
    jest.clearAllMocks();
  });

  it('should add a new note', () => {
    const { result } = renderHook(() => useNoteStore());
    const initialNoteCount = result.current.notes.length;

    act(() => {
      result.current.addNote({ title: 'New Note', content: 'Note content' });
    });

    expect(result.current.notes.length).toBe(initialNoteCount + 1);
    const addedNote = result.current.notes[0];
    expect(addedNote.title).toBe('New Note');
    expect(addedNote.content).toBe('Note content');
    expect(addedNote.id).toBe('mock-uuid-note-123');
  });

  it('should update an existing note', () => {
    const { result } = renderHook(() => useNoteStore());
    act(() => {
      result.current.addNote({ title: 'Note to Update', content: 'Old content' });
    });
    const noteId = result.current.notes[0].id;

    act(() => {
      result.current.updateNote(noteId, { content: 'Updated content' });
    });

    const updatedNote = result.current.getNoteById(noteId);
    expect(updatedNote?.content).toBe('Updated content');
    expect(updatedNote?.updatedAt).toBeGreaterThan(updatedNote?.createdAt || 0);
  });

  it('should delete a note', () => {
    const { result } = renderHook(() => useNoteStore());
    act(() => {
      result.current.addNote({ title: 'Note to Delete', content: 'Content' });
    });
    const noteId = result.current.notes[0].id;

    act(() => {
      result.current.deleteNote(noteId);
    });

    expect(result.current.notes.length).toBe(0);
    expect(result.current.getNoteById(noteId)).toBeUndefined();
  });

  it('should get a note by ID', () => {
    const { result } = renderHook(() => useNoteStore());
    act(() => {
      result.current.addNote({ title: 'Find Me', content: 'Content' });
    });
    const noteId = result.current.notes[0].id;

    const foundNote = result.current.getNoteById(noteId);
    expect(foundNote?.title).toBe('Find Me');
  });

  it('should get notes by category ID', () => {
    const { result } = renderHook(() => useNoteStore());
    act(() => {
      result.current.addNote({ title: 'Note 1', content: 'Cat A', categoryId: 'cat-a' });
      result.current.addNote({ title: 'Note 2', content: 'Cat B', categoryId: 'cat-b' });
      result.current.addNote({ title: 'Note 3', content: 'Cat A', categoryId: 'cat-a' });
    });

    const catANotes = result.current.getNotesByCategoryId('cat-a');
    expect(catANotes.length).toBe(2);
    expect(catANotes[0].title).toBe('Note 1');
    expect(catANotes[1].title).toBe('Note 3');

    const catBNotes = result.current.getNotesByCategoryId('cat-b');
    expect(catBNotes.length).toBe(1);
    expect(catBNotes[0].title).toBe('Note 2');
  });
});

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  categoryId?: string;
}

export interface NewNote {
  title: string;
  content: string;
  categoryId?: string;
}

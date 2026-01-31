export interface Category {
  id: string;
  name: string;
  color?: string;
  createdAt: number;
  updatedAt: number;
}

export interface NewCategory {
  name: string;
  color?: string;
}

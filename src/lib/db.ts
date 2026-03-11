import { Todo } from '@/types/todo';

const globalForDb = globalThis as unknown as { todos: Todo[] };

export const db = globalForDb.todos || [
  { id: 1, text: 'Probar Next.js con Server Actions', completed: false }
];

if (process.env.NODE_ENV !== 'production') globalForDb.todos = db;
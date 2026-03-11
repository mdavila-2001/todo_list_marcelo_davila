import { db } from '@/lib/db';
import TodoForm from '@/components/todo/TodoForm';
import TodoItem from '@/components/todo/TodoItem';

export default function Home() {
  return (
    <main className="app-container">
      <h1 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: 700, textAlign: 'center' }}>
        Lista de Tareas
      </h1>
      
      <TodoForm />

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {db.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
'use client'

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './TodoForm.module.css';

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;
    
    if (!text || text.trim() === '') {
      setError('Por favor, escribe una tarea válida antes de añadir.');
      return;
    }
    
    setError('');
    
    setLoading(true);
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    });
    setLoading(false);
    
    // Limpia el input después de agregar el Todo
    formRef.current?.reset();
    router.refresh();
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.form} style={{ marginBottom: error ? '12px' : '20px' }}>
        <input 
          type="text" 
          name="text" 
          placeholder="¿Qué necesitas hacer hoy?" 
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          onChange={() => { if (error) setError(''); }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0 24px', fontSize: '1rem' }}>
          {loading ? '...' : 'Añadir'}
        </button>
      </form>
      {error && <span className={styles.errorText}>{error}</span>}
    </>
  );
}

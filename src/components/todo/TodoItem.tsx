'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Todo } from '@/types/todo';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editError, setEditError] = useState(false);
  const router = useRouter();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('text') as string;

    if (!text || text.trim() === '') {
      setEditError(true);
      return; // Previene guardar
    }
    setEditError(false);

    await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    setIsEditing(false);
    router.refresh();
  };

  const handleToggle = async () => {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: { 'Content-Type': 'application/json' }
    });
    router.refresh();
  };

  const handleDelete = async () => {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'DELETE'
    });
    setIsDeleting(false);
    router.refresh();
  };

  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : 'todo-item'}`}>
      {isEditing ? (
        <form onSubmit={handleEdit} className={styles.form}>
          <input 
            type="text" 
            name="text" 
            defaultValue={todo.text} 
            autoFocus
            className={`${styles.input} ${editError ? styles.inputError : ''}`}
            onChange={() => { if (editError) setEditError(false); }}
            placeholder={editError ? 'La tarea no puede estar vacía' : ''}
          />
          <button type="submit" className={styles.buttonPrimary}>Guardar</button>
          <button type="button" onClick={() => { setIsEditing(false); setEditError(false); }} className={styles.buttonSecondary}>Cancelar</button>
        </form>
      ) : (
        <>
          <label className={styles.checkboxWrapper}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={handleToggle} 
            />
            <span className={styles.text}>{todo.text}</span>
          </label>
          <div className={styles.actions} style={{ opacity: todo.completed ? 0.3 : 1 }}>
            <button 
              onClick={() => !todo.completed && setIsEditing(true)} 
              disabled={todo.completed}
              className={styles.iconButton}
              title="Editar"
            >
              <span className="material-symbols-outlined">
                edit
              </span>
            </button>
            <button 
              onClick={() => setIsDeleting(true)}
              className={styles.deleteButton}
              title="Eliminar"
            >
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        </>
      )}

      {isDeleting && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>¿Eliminar tarea?</h3>
            <p>¿Estás seguro de que deseas eliminar permanentemente &quot;{todo.text}&quot;?</p>
            <div className={styles.modalActions}>
              <button 
                onClick={() => setIsDeleting(false)} 
                className={styles.buttonSecondary}
              >
                Cancelar
              </button>
              <button 
                onClick={handleDelete} 
                className={styles.deleteButtonConfirm}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

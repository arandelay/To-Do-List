import { useState, useCallback } from 'react';
import { Todo } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const saveTodos = useCallback((newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  }, []);

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    saveTodos([...todos, newTodo]);
  }, [todos, saveTodos]);

  const toggleTodo = useCallback((id: string) => {
    saveTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [todos, saveTodos]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    saveTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }, [todos, saveTodos]);

  const deleteTodo = useCallback((id: string) => {
    saveTodos(todos.filter((todo) => todo.id !== id));
  }, [todos, saveTodos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}
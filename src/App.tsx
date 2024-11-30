import React, { useState } from 'react';
import { ListTodo } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import { Todo } from './types/todo';

function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
    // In a real app, you'd show a modal or inline edit form here
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const newTitle = prompt('Edit task:', todo.title);
      if (newTitle) {
        updateTodo(id, { title: newTitle });
      }
    }
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="flex items-center gap-4 mb-8">
          <ListTodo size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <TodoForm onAdd={addTodo} />

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={handleEdit}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
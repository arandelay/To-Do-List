import React from 'react';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-blue-100',
    medium: 'bg-yellow-100',
    high: 'bg-red-100',
  };

  return (
    <div className={`flex items-center p-4 mb-2 rounded-lg bg-white shadow-sm border border-gray-200 ${todo.completed ? 'opacity-75' : ''}`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center
          ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>
      
      <div className="flex-1">
        <h3 className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        <div className="flex gap-2 mt-1">
          <span className="text-sm text-gray-500">{todo.category}</span>
          <span className={`text-sm px-2 rounded-full ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(todo.id)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Edit2 size={18} className="text-gray-600" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Trash2 size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
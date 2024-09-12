import React, { useState, useEffect } from 'react';
import useTodoStore from './store/todoStore';

function App() {
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);


  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({ title: newTodo, completed: false });
      setNewTodo('');
    }
  };


  const handleToggleComplete = (id, currentTodo) => {
    updateTodo(id, { ...currentTodo, completed: !currentTodo.completed });
  };


  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>

          <div className="flex mb-4">
            <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New task..."
            />
            <button
                onClick={handleAddTodo}
                className="ml-2 bg-blue-500 text-white p-2 rounded"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="flex justify-between items-center p-2 bg-gray-200 rounded"
                >
              <span
                  className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
                  onClick={() => handleToggleComplete(todo.id, todo)}
              >
                {todo.title}
              </span>
                  <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;

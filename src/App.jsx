import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');
  const valueInput = useRef(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEditTodo = (index) => {
    setEditIndex(index);
    setEditInput(todos[index]);
  };

  const saveEditTodo = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? editInput : todo));
    setTodos(newTodos);
    setEditIndex(null);
    setEditInput('');
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="input-container">
        <input ref={valueInput}
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editIndex === index ? (
              <>
                <input 
                  type="text" 
                  value={editInput} 
                  onChange={(e) => setEditInput(e.target.value)} 
                />
                <button onClick={() => saveEditTodo(index)}>Save</button>
              </>
            ) : (
              <>
                {todo}
                <div>
                  <button onClick={() => startEditTodo(index)}>Edit</button>
                  <button onClick={() => removeTodo(index)}>Remove</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
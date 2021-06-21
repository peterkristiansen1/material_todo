import { IconButton, InputLabel, TextField, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../../types';
import ActionButtons from '../ActionButtons/ActionButtons';
import TodoList from '../TodoList/TodoList';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState('');

  React.useEffect(() => {
    // Load todos from local storage when app loads.
    try {
      const serializedTodos = localStorage.getItem('todos');
      const parsedTodos = serializedTodos && JSON.parse(serializedTodos);
      if (Array.isArray(parsedTodos)) {
        setTodos(parsedTodos);
      }
    } catch (error) {
      // Do nothing - we just load the app with an empty todo list.
    }
  }, []);

  const createTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const todoIds = todos.map((todo) => todo.id);
    const newTodoId = todoIds.length ? Math.max(...todoIds) + 1 : 1;
    setTodos([
      ...todos,
      {
        name: newTodoName,
        id: newTodoId,
        checked: false,
      },
    ]);
    setNewTodoName('');
  };

  const updateTodo = (newTodo: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const deleteAllTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <>
      <Link to="/about">
        <Typography>About</Typography>
      </Link>
      <Typography variant="h2" variantMapping={{ h2: 'h1' }}>
        Todo App
      </Typography>
      <TodoList todoList={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      <form noValidate className={styles.form} onSubmit={createTodo}>
        <InputLabel htmlFor="addnew">
          <Typography variant="h4" variantMapping={{ h4: 'h2' }}>
            Add new todo
          </Typography>
        </InputLabel>
        <TextField
          id="addnew"
          value={newTodoName}
          onChange={(event) => setNewTodoName(event.target.value)}
          className={styles.inputWrapper}
        />
        <IconButton
          disabled={!newTodoName}
          aria-label="Save todo entry"
          type="submit"
        >
          <CheckIcon />
        </IconButton>
      </form>
      <ActionButtons saveTodos={saveTodos} deleteTodos={deleteAllTodos} />
    </>
  );
};

export default HomePage;

import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  let nextId = useRef(todos.length+1);

  let onInsert = useCallback(text => {
    setTodos(todos.concat({
      id: nextId.current,
      text,
      checked: false
    }))

    nextId.current++;
  }, [todos])

  let onToggle = useCallback(id => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo))
  }, [todos])

  let onRemove = useCallback(id => {
    setTodos(todos.filter(todo => todo.id !== id))
  })

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove}/>
    </TodoTemplate>
  );
};

export default App;

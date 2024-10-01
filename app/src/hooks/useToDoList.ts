import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const defaultTodoList = [
  {
    id: 1,
    content: '운동하기',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: '공부하기',
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: '개발하기',
    date: dayjs(),
    isSuccess: true,
  },
];

const useToDoList = (selectedDate: Dayjs) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [todoInput, setTodoInput] = useState('');

  const addTodo = () => {
    const len = todoList.length;
    const lastId = len === 0 ? 1 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: todoInput,
        date: selectedDate,
        isSuccess: false,
      },
    ];

    setTodoList(newTodoList);
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  };

  const toggleTodo = (todoId: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });
    setTodoList(newTodoList);
  };

  return {
    todoList,
    setTodoInput,
  };
};

export default useToDoList;

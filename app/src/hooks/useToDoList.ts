import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { defaultTodoList } from '../constants/todos';

const dataTodoList = defaultTodoList;

const useTodoList = (selectedDate: Dayjs) => {
  const [todoList, setTodoList] = useState(dataTodoList);
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
      return todo.id !== todoId
        ? todo
        : { ...todo, isSuccess: !todo.isSuccess };
    });
    setTodoList(newTodoList);
  };

  const resetInput = () => {
    setTodoInput('');
  };

  const filteredTodoList = todoList.filter((todo) => {
    const isSame = dayjs(todo.date.format()).isSame(
      dayjs(selectedDate.format()),
      'date',
    );
    return isSame;
  });

  return {
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
    filteredTodoList,
    todoList,
  };
};

export default useTodoList;

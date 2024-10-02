import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { defaultTodoList } from '../constants/todos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TODO_LIST_KEY } from '../constants/item_constant';
import { ToDoItemType } from '../pages/TodoPage';

const dataTodoList = defaultTodoList;

const useTodoList = (selectedDate: Dayjs) => {
  const [todoList, setTodoList] = useState(dataTodoList);
  const [todoInput, setTodoInput] = useState('');
  const [loading, setLoading] = useState(true);

  const saveTodoList = (newTodoList: Array<ToDoItemType>) => {
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

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
    saveTodoList(newTodoList);
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    saveTodoList(newTodoList);
  };

  const toggleTodo = (todoId: number) => {
    const newTodoList = todoList.map((todo) => {
      return todo.id !== todoId
        ? todo
        : { ...todo, isSuccess: !todo.isSuccess };
    });
    saveTodoList(newTodoList);
  };

  const resetInput = () => {
    setTodoInput('');
  };

  const filteredTodoList = todoList.filter((todo) => {
    const isSame = dayjs(dayjs(todo.date).format()).isSame(
      dayjs(dayjs(selectedDate).format()),
      'date',
    );
    return isSame;
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem(TODO_LIST_KEY);
    if (jsonValue) {
      const newTodoList = JSON.parse(jsonValue);
      setTodoList(newTodoList);
    }
    setLoading(false);
  };

  return {
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
    filteredTodoList,
    todoList,
    loading,
  };
};

export default useTodoList;

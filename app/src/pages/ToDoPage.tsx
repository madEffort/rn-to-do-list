import React, { useRef } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { Platform } from 'react-native';

import useCalender from '../hooks/useCalender';
import { useTodoList } from '../hooks';
import { Margin } from '../components/common';
import { AddTodoInput, Calendar } from '../domains/components';
import { ITEM_WIDTH } from '../constants/item_constant';

import Icon from 'react-native-vector-icons/Ionicons';
import { getCalendarColumns } from '../utils/calendar';

export type ToDoItemType = {
  id: number;
  content: string;
  date: Dayjs;
  isSuccess: boolean;
};

const TodoPage = () => {
  const now = dayjs();

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    add1Month,
    subtract1Month,
  } = useCalender(now);
  const flatListRef = useRef<FlatList>(null);

  const data = selectedDate;

  const {
    todoInput,
    setTodoInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
    filteredTodoList,
    todoList,
    loading,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const onPressAdd = () => {
    addTodo();
    resetInput();
  };

  const onSubmitEditing = () => {
    addTodo();
    resetInput();
  };

  const onFocus = () => {
    scrollToEnd();
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <Calendar
          columns={columns}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          add1Month={add1Month}
          subtract1Month={subtract1Month}
          showDatePicker={showDatePicker}
          isDatePickerVisible={isDatePickerVisible}
          hideDatePicker={hideDatePicker}
          handleConfirm={handleConfirm}
          todoList={todoList}
        />
        <Margin height={10} />
        <View
          style={{
            alignSelf: 'center',
            width: 5,
            height: 5,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#000',
          }}
        />
        <Margin height={14} />
      </View>
    );
  };

  const renderItem: ListRenderItem<ToDoItemType> = (todo) => {
    const isSuccess = todo.item.isSuccess;

    const handleOnPress = (todoId: number) => {
      toggleTodo(todoId);
    };

    return (
      <Pressable
        onPress={() => handleOnPress(todo.item.id)}
        onLongPress={() => {
          Alert.alert('삭제하시겠어요?', `${todo.item.content}`, [
            {
              style: 'cancel',
              text: '아니요',
            },
            {
              text: '예',
              onPress: () => removeTodo(todo.item.id),
            },
          ]);
        }}
        style={{
          alignSelf: 'center',
          width: ITEM_WIDTH,
          paddingVertical: 16,
          paddingHorizontal: 8,
          borderBottomWidth: 0.2,
          borderColor: 'black',
          backgroundColor: todo.item.id % 2 === 0 ? 'pink' : 'transparent',
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#000' }}>{todo.item.content}</Text>
          {isSuccess && <Icon name="checkmark" size={16} color={'black'} />}
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <FlatList
            ref={flatListRef}
            data={filteredTodoList}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            onContentSizeChange={scrollToEnd}
          />

          <AddTodoInput
            value={todoInput}
            onChangeText={setTodoInput}
            onPressAdd={onPressAdd}
            onFocus={onFocus}
            placeholder={`"${dayjs(data.format()).format('M월 D일')}"에 할 일을 추가해보세요.`}
            onSubmitEditing={onSubmitEditing}
          />

          <Margin height={16} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TodoPage;

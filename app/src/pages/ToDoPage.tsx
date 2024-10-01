import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getCalendarColumns } from '../utils/calendar';
import dayjs, { Dayjs } from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { getDayColor, getDayOfWeek } from '../utils/customUtils';
import useCalender from '../hooks/useCalender';
import ArrowButton from '../domains/components/ArrowButton';
import Column from '../domains/components/Column';
import { useToDoList } from '../hooks';

const ToDoPage = () => {
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

  const { todoList } = useToDoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  useEffect(() => {
    console.log(selectedDate.format());
  }, [selectedDate]);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY-MM-DD');

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowButton iconName="arrow-left" onPress={subtract1Month} />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20 }}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButton iconName="arrow-right" onPress={add1Month} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map((item) => {
            const dayText = getDayOfWeek(item);
            const color = getDayColor(item);

            return (
              <Column
                key={`key-day-${item}`}
                color={color}
                opacity={1}
                text={dayText}
                disabled={true}
                isSelected={false}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem: ListRenderItem<Dayjs> = ({ item }) => {
    const dateText = dayjs(item.format()).date();
    const day = dayjs(item.format()).day();
    const color = day === 0 ? 'red' : day === 6 ? 'blue' : 'black';
    const isCurrentMonth = dayjs(item.format()).isSame(
      dayjs(selectedDate).format(),
      'month',
    );
    const opacity = isCurrentMonth ? 1 : 0.4;
    const isSelected = dayjs(item.format()).isSame(
      dayjs(selectedDate).format(),
      'day',
    );

    const handlePress = () => {
      setSelectedDate(item);
    };

    return (
      <Column
        color={color}
        opacity={opacity}
        text={dateText}
        disabled={false}
        onPress={handlePress}
        isSelected={isSelected}
      />
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={columns}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

export default ToDoPage;

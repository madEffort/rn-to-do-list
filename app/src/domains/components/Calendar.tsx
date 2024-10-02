import React from 'react';
import {
  FlatList,
  View,
  Text,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import dayjs, { Dayjs } from 'dayjs';

import { getDayColor, getDayOfWeek } from '../../utils/customUtils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Column, ArrowButton } from './index';

type CalendarProps = {
  columns: Dayjs[];
  selectedDate: Dayjs;
  setSelectedDate: (date: Dayjs) => void;
  add1Month: () => void;
  subtract1Month: () => void;
  showDatePicker: () => void;
  isDatePickerVisible: boolean;
  hideDatePicker: () => void;
  handleConfirm: (date: Date) => void;
  todoList: { id: number; content: string; date: Dayjs; isSuccess: boolean }[];
};

const Calendar = ({
  columns,
  selectedDate,
  setSelectedDate,
  add1Month,
  subtract1Month,
  showDatePicker,
  isDatePickerVisible,
  hideDatePicker,
  handleConfirm,
  todoList,
}: CalendarProps) => {
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY-MM-DD');

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
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
                hasTodo={false}
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

    const hasTodo = todoList.filter((todo) => {
      return dayjs(dayjs(todo.date).format()).isSame(
        dayjs(dayjs(item).format()).format(),
        'date',
      );
    });

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
        hasTodo={hasTodo.length > 0}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <View>
        <FlatList
          style={{ flex: 1 }}
          data={columns}
          numColumns={7}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Calendar;

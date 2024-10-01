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
import styled from 'styled-components';
import Margin from '../components/common/Margin';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type ColumnProps = {
  color: string;
  opacity: number;
  text: string | number;
  disabled: boolean;
  onPress: () => void;
  isSelected: boolean;
};

const Column = ({
  color,
  opacity,
  text,
  disabled,
  onPress,
  isSelected,
}: ColumnProps) => {
  const columnSize = 40;

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: columnSize,
        height: columnSize,
        backgroundColor: isSelected ? 'grey' : 'transparent',
        borderRadius: columnSize,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{
          color: isSelected ? 'white' : color,
          opacity: opacity,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

type ArrowProps = {
  iconName: string;
  size: number;
  color: string;
  onPress: () => void;
};

const ArrowButton = ({ iconName, size, color, onPress }: ArrowProps) => {
  return (
    <TouchableOpacity
      style={{ paddingVertical: 16, paddingHorizontal: 22 }}
      onPress={onPress}>
      <SimpleLineIcons name={iconName} size={16} color="#000" />
    </TouchableOpacity>
  );
};

const ToDoPage = () => {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);
  const columns = getCalendarColumns(selectedDate);

  useEffect(() => {
    console.log(selectedDate.format());
  }, [selectedDate]);

  const getDayOfWeek = (dayNumber: number): string => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return daysOfWeek[dayNumber];
  };

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
          <ArrowButton
            iconName="arrow-left"
            size={16}
            color="#000"
            onPress={() => {}}
          />
          <TouchableOpacity>
            <Text style={{ fontSize: 20 }}>{currentDateText}</Text>
          </TouchableOpacity>
          <ArrowButton
            iconName="arrow-right"
            size={16}
            color="#000"
            onPress={() => {}}
          />
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
                onPress={() => {}}
                isSelected={false}></Column>
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
        renderItem={renderItem}></FlatList>
    </SafeAreaView>
  );
};

export const getDayColor = (day: number) => {
  return day === 0 ? 'red' : day === 6 ? 'blue' : 'black';
};

export default ToDoPage;

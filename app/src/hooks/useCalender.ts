import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const useCalender = (now: Dayjs) => {
  const [selectedDate, setSelectedDate] = useState(now);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn('A date has been picked: ', date);
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  const add1Month = () => {
    setSelectedDate(dayjs(selectedDate).add(1, 'month'));
  };

  const subtract1Month = () => {
    setSelectedDate(dayjs(selectedDate).subtract(1, 'month'));
  };

  return {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    add1Month,
    subtract1Month,
  };
};

export default useCalender;

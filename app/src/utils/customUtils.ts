export const getDayColor = (day: number) => {
  return day === 0 ? 'red' : day === 6 ? 'blue' : 'black';
};

export const getDayOfWeek = (dayNumber: number): string => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return daysOfWeek[dayNumber];
};

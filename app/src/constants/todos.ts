import dayjs from 'dayjs';

export const defaultTodoList = [
  {
    id: 1,
    content: '이런 앱이 있으면',
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: '좋겠다는 아이디어를',
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: '리뷰 댓글로 남겨주세요!',
    date: dayjs(),
    isSuccess: true,
  },
];

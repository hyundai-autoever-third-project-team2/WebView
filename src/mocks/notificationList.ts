import { NotificationType } from '../pages/notification/NotificationComponent';

export const notificationList = [
  {
    id: 1,
    type: NotificationType.RESULT,
    isClicked: false,
    content: '회원님이 등록하신 123바 1234 차량의 시세 측정이 완료되었어요.',
    receivedTime: '2025-01-06 13:51',
  },
  {
    id: 2,
    type: NotificationType.WISHLIST,
    isClicked: false,
    content: '회원님이 관심 차량으로 등록하신 소나타 차량이 추가로 입고되었어요.',
    receivedTime: '2025-01-07 15:42',
  },
  {
    id: 3,
    type: NotificationType.DISCOUNT,
    isClicked: true,
    content: '회원님이 관심 차량으로 등록하신 G80 차량의 가격이 하락했어요.',
    receivedTime: '2025-12-26 12:42',
  },
];

export default notificationList;

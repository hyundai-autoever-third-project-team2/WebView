import { NotificationListResponse } from 'types/notification';
import { client } from 'utils/axiosInstance';

export const fetchNotificationList = async () => {
  const response = await client.get<NotificationListResponse>('/notification/list');
  return response.data;
};

export const fetchNotificationClick = async (notificationId: number) => {
  const response = await client.put('/notification/click', {
    notificationId,
  });
  return response.data;
};

import { createQueryKeys } from '@lukemorales/query-key-factory';
import { fetchNotificationList } from 'api/notification/notificationApi';

export const notification = createQueryKeys('notification', {
  all: null,
  getList: () => ({
    queryKey: ['notificationList'],
    queryFn: fetchNotificationList,
  }),
});

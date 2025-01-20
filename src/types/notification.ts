import { NotificationType } from 'pages/notification/NotificationComponent';

export interface NotificationResponse {
  notificationId: number;
  notificationType: NotificationType;
  receivedTime: string;
  title: string;
  content: string;
  read: boolean;
}

export type NotificationListResponse = NotificationResponse[];

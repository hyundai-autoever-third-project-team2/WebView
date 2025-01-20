import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ResultIcon from 'assets/icon_result.png';
import WishlistIcon from 'assets/icon_add.png';
import DiscountIcon from 'assets/icon_down.png';
import { formatReceivedTime } from 'utils/formatDate';
import { useMutation } from '@tanstack/react-query';
import { fetchNotificationClick } from 'api/notification/notificationApi';

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  gap: 10px;
  background: transparent;
  cursor: pointer;

  &:active {
    background: rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const IconWrapper = styled.img`
  width: auto;
  height: auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  gap: 10px;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  line-height: 1.5;
`;

const ReceivedTimeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export enum NotificationType {
  RESULT = 'result',
  WISHLIST = 'wishlist',
  DISCOUNT = 'discount',
}

interface NotificationComponentProps {
  isClicked: boolean;
  type: NotificationType;
  content: string;
  receivedTime: string;
  notificationId: number;
  onClick?: () => void;
}

const NOTIFICATION_ICONS: Record<NotificationType, string> = {
  [NotificationType.RESULT]: ResultIcon,
  [NotificationType.WISHLIST]: WishlistIcon,
  [NotificationType.DISCOUNT]: DiscountIcon,
};

const NOTIFICATION_TITLES: Record<NotificationType, string> = {
  [NotificationType.RESULT]: '결과 알림이 도착했어요.',
  [NotificationType.WISHLIST]: '관심 차량이 추가로 등록되었어요.',
  [NotificationType.DISCOUNT]: '관심 차량 가격이 하락했어요.',
};

function NotificationComponent({
  isClicked = false,
  type,
  content,
  receivedTime,
  notificationId,
  onClick,
}: NotificationComponentProps) {
  const navigate = useNavigate();
  const { mutate } = useMutation({ mutationFn: fetchNotificationClick });
  const title = NOTIFICATION_TITLES[type];
  const icon = NOTIFICATION_ICONS[type];

  const handleNotificationClick = () => {
    // 먼저 onClick prop이 있다면 실행
    if (onClick) {
      onClick();
    }

    mutate(notificationId);
    // 알림 타입에 따른 라우팅 처리
    switch (type) {
      case NotificationType.RESULT:
        navigate(`/my/register`);
        break;
      case NotificationType.WISHLIST:
      case NotificationType.DISCOUNT:
        navigate(`/wishlist`);
        break;
    }
  };

  return (
    <NotificationWrapper onClick={handleNotificationClick}>
      <TitleWrapper>
        <IconContainer>
          {!isClicked && <NotificationDot />}
          <IconWrapper src={icon} alt="알림 아이콘" />
        </IconContainer>
        {title}
      </TitleWrapper>
      <ContentWrapper>{content}</ContentWrapper>
      <ReceivedTimeWrapper>{formatReceivedTime(receivedTime)}</ReceivedTimeWrapper>
    </NotificationWrapper>
  );
}

export default NotificationComponent;

import Toolbar from 'components/common/Toolbar';
import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';
import NotificationComponent from './NotificationComponent';
import { notification } from 'queries/notification';
import { useQuery } from '@tanstack/react-query';

const NotificationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 20px; */
  gap: 20px;
  margin-top: ${LAYOUT.TOOLBAR_HEIGHT};
`;

function NotificationPage() {
  const { data } = useQuery({ ...notification.getList() });

  if (data) {
    return (
      <>
        <Toolbar title="알림" rightButtons={['close']} />
        <NotificationPageContainer>
          {data.map((notification) => (
            <NotificationComponent
              key={notification.notificationId}
              notificationId={notification.notificationId}
              type={notification.notificationType}
              content={notification.content}
              receivedTime={notification.receivedTime}
              isClicked={notification.read}
            />
          ))}
        </NotificationPageContainer>
      </>
    );
  }
}

export default NotificationPage;

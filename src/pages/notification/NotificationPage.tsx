import Toolbar from 'components/common/Toolbar';
import notificationList from 'mocks/notificationList';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';
import NotificationComponent from './NotificationComponent';

const NotificationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 20px; */
  gap: 20px;
  margin-top: ${LAYOUT.APP_BAR_HEIGHT};
`;

const mockApiResponse = notificationList;

function NotificationPage() {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar
        title="알림"
        onBackClick={() => {
          navigate(-1);
        }}
        showBackButton
      />
      <NotificationPageContainer>
        {mockApiResponse.map((notification) => (
          <NotificationComponent
            key={notification.id}
            type={notification.type}
            content={notification.content}
            receivedTime={notification.receivedTime}
            isClicked={notification.isClicked}
          />
        ))}
      </NotificationPageContainer>
    </>
  );
}

export default NotificationPage;

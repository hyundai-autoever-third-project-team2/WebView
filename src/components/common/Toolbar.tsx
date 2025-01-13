import React from 'react';
import styled, { css } from 'styled-components';
import { LAYOUT } from 'styles/constants';
import LogoIcon from '../../assets/logo_small.png';
import ShareIcon from '../../assets/icon_share.svg';
import CloseIcon from '../../assets/icon_close.svg';
import NotificationIcon from '../../assets/icon_notification.svg';

type ButtonType = 'close' | 'notification' | 'share';

//showBackButton (닫기 버튼튼)
interface ToolbarProps {
  showBackButton?: boolean;
  showLogo?: boolean;
  title?: string;
  titleAlignment?: 'center' | 'left';
  rightButtons?: ButtonType[];
  backgroundColor?: string;
  onBackClick?: () => void;
}

const ToolbarContainer = styled.header<{ $backgroundColor?: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 768px;
  height: ${LAYOUT.Toolbar_HEIGHT};
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  ${({ $backgroundColor }) =>
    $backgroundColor &&
    css`
      background: ${$backgroundColor};
      border-bottom: none;
    `}
`;

const LeftSection = styled.div<{ $isLeftAligned: boolean; $showBackButton: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 ${(props) => (props.$isLeftAligned && props.$showBackButton ? '40px' : '90px')};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Logo = styled.div``;

const TitleSection = styled.div<{ $alignment: 'center' | 'left' }>`
  flex: 1;
  display: flex;
  justify-content: ${(props) => (props.$alignment === 'center' ? 'center' : 'flex-start')};
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex: 0 0 90px;
`;

const handleNotificationButtonClick = () => {
  console.log('TODO : Notification 컴포넌트 동작');
};

const handleCloseButtonClick = () => {
  console.log('TODO : 화면 닫기 구현');
};

const handleShareButtonClick = () => {
  console.log('TODO : Share 컴포넌트 동작');
};

//뒤로가기 임시아이콘
const BackIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const Toolbar: React.FC<ToolbarProps> = ({
  showBackButton = false,
  showLogo = false,
  title = '',
  titleAlignment = 'center',
  rightButtons = [],
  backgroundColor,
  onBackClick,
}) => {
  // 우측 버튼 아이콘 설정
  const getIconComponent = (type: ButtonType) => {
    switch (type) {
      case 'close':
        return <img src={CloseIcon} alt="Close" />;
      case 'notification':
        return <img src={NotificationIcon} alt="Close" />;
      case 'share':
        return <img src={ShareIcon} alt="Share" />;
      default:
        return null;
    }
  };
  // 우측 버튼 클릭 이벤트 설정
  const getButtonOnClick = (type: ButtonType) => {
    switch (type) {
      case 'notification':
        return () => handleNotificationButtonClick();
      case 'close':
        return () => handleCloseButtonClick();
      case 'share':
        return () => handleShareButtonClick();
      default:
        return () => {};
    }
  };

  return (
    <ToolbarContainer $backgroundColor={backgroundColor}>
      <LeftSection $isLeftAligned={titleAlignment === 'left'} $showBackButton={showBackButton}>
        {showBackButton && (
          <IconButton onClick={onBackClick} aria-label="Back">
            <BackIcon />
          </IconButton>
        )}
        {showLogo && (
          <Logo>
            <img src={LogoIcon} alt="Logo" />
          </Logo>
        )}
      </LeftSection>

      <TitleSection $alignment={titleAlignment}>
        <Title>{title}</Title>
      </TitleSection>

      <RightSection>
        {rightButtons.map((button, index) => (
          <IconButton key={index} onClick={getButtonOnClick(button)} aria-label={button}>
            {getIconComponent(button)}
          </IconButton>
        ))}
      </RightSection>
    </ToolbarContainer>
  );
};

export default Toolbar;

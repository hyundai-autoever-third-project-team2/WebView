import React from 'react';
import styled, { css } from 'styled-components';
import { LAYOUT } from 'styles/constants';
import LogoIcon from '../../assets/logo_small.png';
import ShareIcon from '../../assets/icon_share.svg';
import CloseIcon from '../../assets/icon_close.svg';
import NotificationIcon from '../../assets/icon_notification.svg';
import NotificationIconWhite from '../../assets/icon_notification_white.svg';
import SettingIconWhite from '../../assets/icon_setting_white.svg';
import BackIcon from '../../assets/icon_back.svg';
import BackIconWhite from '../../assets/icon_back_white.svg';
import { useNavigate } from 'react-router-dom';

export { Title, ToolbarContainer };

//버튼 종류 늘어날 시 추가하시길 .. + getIconComponent 로 아이콘 import , clickbutton 이벤트로 동작 설정
type ButtonType = 'close' | 'notification' | 'share' | 'notificationWhite' | 'settingWhite';

//showBackButton (닫기 버튼튼)
interface ToolbarProps {
  showBackButton?: boolean;
  showBackButtonWhite?: boolean;
  showLogo?: boolean;
  title?: string;
  titleAlignment?: 'center' | 'left';
  rightButtons?: ButtonType[];
  backgroundColor?: string;
  color?: string;
  onBackClick?: () => void;
}

const ToolbarContainer = styled.header<{ $backgroundColor?: string; $color?: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 768px;
  height: ${LAYOUT.TOOLBAR_HEIGHT};
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

  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
`;

const LeftSection = styled.div<{ $isLeftAligned: boolean; $showBackButton: boolean; $showBackButtonWhite: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0
    ${(props) => (props.$isLeftAligned && (props.$showBackButton || props.$showBackButtonWhite) ? '40px' : '90px')};
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


const handleShareButtonClick = () => {
  console.log('TODO : Share 컴포넌트 동작');
};

const handleSettingButtonClick = () => {
  console.log('TODO : Setting 컴포넌트 동작');
};

const Toolbar: React.FC<ToolbarProps> = ({
  showBackButton = false,
  showBackButtonWhite = false,
  showLogo = false,
  title = '',
  titleAlignment = 'center',
  rightButtons = [],
  backgroundColor,
  color,
  onBackClick,
}) => {
  const navigate = useNavigate()

  const handleCloseButtonClick = () => {
    navigate(-1)
  };

  // 우측 버튼 아이콘 설정
  const getIconComponent = (type: ButtonType) => {
    switch (type) {
      case 'close':
        return <img src={CloseIcon} alt="Close" />;
      case 'notification':
        return <img src={NotificationIcon} alt="Notification" />;
      case 'share':
        return <img src={ShareIcon} alt="Share" />;
      case 'notificationWhite':
        return <img src={NotificationIconWhite} alt="Notification_white_ver" />;
      case 'settingWhite':
        return <img src={SettingIconWhite} alt="Setting_white_ver" />;
      default:
        return null;
    }
  };
  // 우측 버튼 클릭 이벤트 설정
  const getButtonOnClick = (type: ButtonType) => {
    switch (type) {
      case 'notification':
      case 'notificationWhite':
        return () => handleNotificationButtonClick();
      case 'close':
        return () => handleCloseButtonClick();
      case 'share':
        return () => handleShareButtonClick();
      case 'settingWhite':
        return () => handleSettingButtonClick();
      default:
        return () => {};
    }
  };

  return (
    <ToolbarContainer $backgroundColor={backgroundColor} $color={color}>
      <LeftSection
        $isLeftAligned={titleAlignment === 'left'}
        $showBackButton={showBackButton}
        $showBackButtonWhite={showBackButtonWhite}
      >
        {showBackButton && (
          <IconButton onClick={onBackClick} aria-label="Back">
            <img src={BackIcon} alt="Back" />
          </IconButton>
        )}
        {showBackButtonWhite && (
          <IconButton onClick={onBackClick} aria-label="Back">
            <img src={BackIconWhite} alt="BackWhiteVer" />
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

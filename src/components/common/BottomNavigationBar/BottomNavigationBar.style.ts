import styled from 'styled-components';
import { LAYOUT } from 'styles/constants';

interface StyledButtonProps {
  $isActive?: boolean;
}

export const NavContainer = styled.div`
  position: fixed;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: ${LAYOUT.BOTTOM_NAVIGATION_HEIGHT};
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;
`;

export const NavButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 8px 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? props.theme.colors.primary : '#9ca3af')};

  &:focus {
    outline: none;
  }
`;

export const NavLabel = styled.span`
  font-size: 12px;
  margin-top: 4px;
`;

export const CenterButtonWrapper = styled.div`
  flex: 1;
  position: relative;
  bottom: 25px;
`;

export const CenterButton = styled.button<StyledButtonProps>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-24px);
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;
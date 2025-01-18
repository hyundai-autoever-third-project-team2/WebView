import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const LoginButtonWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.1s ease-in-out;

  &:active {
    transform: translateX(-50%) scale(0.97);
    filter: brightness(0.95);
  }
`;

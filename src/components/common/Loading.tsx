import styled, { keyframes } from 'styled-components';
import { theme } from 'styles/theme.ts';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #fff;
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

function Loading() {
  return (
    <LoadingOverlay>
      <LoadingCircle />
    </LoadingOverlay>
  );
}

export default Loading;

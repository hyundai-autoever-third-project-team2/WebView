import styled, { css, keyframes } from 'styled-components';

const wave = keyframes`
  0% {
    background-position: 200% 50%;
  }
  100% {
    background-position: -200% 50%;
  }
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

interface SkeletonItemProps {
  $width?: string | number;
  $height?: string | number;
  $borderRadius?: string | number;
  $variant: 'text' | 'circular' | 'rectangular';
  $animation: 'pulse' | 'wave' | 'none';
}

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SkeletonItem = styled.span<SkeletonItemProps>`
  display: block;
  background-color: ${({ theme }) => theme.colors.neutral100};
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width || '100%')};
  height: ${({ $height }) => (typeof $height === 'number' ? `${$height}px` : $height || '20px')};

  ${({ $variant, $borderRadius }) => {
    switch ($variant) {
      case 'circular':
        return css`
          border-radius: 50%;
        `;
      case 'text':
        return css`
          border-radius: 4px;
          margin-top: 0;
          margin-bottom: 0;
          height: auto;
          transform-origin: 0 55%;
          transform: scale(1, 0.6);

          &:empty:before {
            content: '\\00a0';
          }
        `;
      default:
        return css`
          border-radius: ${typeof $borderRadius === 'number' ? `${$borderRadius}px` : $borderRadius || '4px'};
        `;
    }
  }}

  ${({ $animation }) => {
    switch ($animation) {
      case 'pulse':
        return css`
          animation: ${pulse} 1s ease-in-out 0.3s infinite;
        `;
      case 'wave':
        return css`
          background: linear-gradient(
            90deg,
            ${({ theme }) => theme.colors.grayDark} 25%,
            ${({ theme }) => theme.colors.grayLight} 37%,
            ${({ theme }) => theme.colors.grayDark} 63%
          );
          background-size: 200% 100%;
          animation: ${wave} 1.5s infinite;
        `;
      default:
        return '';
    }
  }}
`;

import { css } from 'styled-components';
import { LAYOUT } from './constants';

export const mobileStyles = (hasBottomPadding: boolean = true) => css`
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: ${hasBottomPadding ? LAYOUT.BOTTOM_NAVIGATION_HEIGHT : 0};
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// 기본 브라우저 스타일을 제거합니다.
export const mobileInputStyles = `
  input, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

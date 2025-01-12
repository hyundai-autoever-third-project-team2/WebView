import { LAYOUT } from './constants';

export const mobileStyles = `
  max-width: 768px;
  margin: 0 auto;
  padding-bottom: ${LAYOUT.BOTTOM_NAVIGATION_HEIGHT};
  ::-webkit-scrollbar {
    display: none;
  }
  scollbar-width: none;
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
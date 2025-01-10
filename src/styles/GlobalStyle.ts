import { createGlobalStyle } from 'styled-components';
import { mobileStyles, mobileInputStyles } from './Layout.styles';

export const GlobalStyle = createGlobalStyle<{ type: 'mobile' | 'admin' }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // 컴포넌트 클릭 시 파란색 하이라이트를 제거합니다.
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  html, body {
    background-color: ${({ theme }) => theme.colors.neutral50};
    ${({ type }) => type === 'mobile' && mobileStyles}
  }

  ${({ type }) => type === 'mobile' && mobileInputStyles}
`;

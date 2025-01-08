import { createGlobalStyle } from 'styled-components';
import { mobileStyles, mobileInputStyles } from './Layout.styles';

export const GlobalStyle = createGlobalStyle<{ type: 'mobile' | 'admin' }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background-color: ${({ theme }) => theme.colors.neutral50};
    ${({ type }) => type === 'mobile' && mobileStyles}
  }

  ${({ type }) => type === 'mobile' && mobileInputStyles}
`;
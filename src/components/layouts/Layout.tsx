import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalStyle';
import styled from 'styled-components';
import Loading from 'components/common/Loading';
import { mobileStyles } from '../../styles/Layout.styles';

interface LayoutProps {
  type: 'mobile' | 'admin';
}

const Container = styled.div<LayoutProps>`
  min-height: 100vh;
  ${({ type }) => type === 'mobile' && mobileStyles}
`;

export function Layout({ type }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle type={type} />
      <Container type={type}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Container>
    </ThemeProvider>
  );
}
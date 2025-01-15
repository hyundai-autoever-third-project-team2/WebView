import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStyle } from 'styles/GlobalStyle';
import Loading from 'components/common/Loading';

interface LayoutProps {
  type: 'mobile';
  hasNavBar?: boolean;
  children?: React.ReactNode;
}

export function Layout({ type, hasNavBar, children }: LayoutProps) {
  return (
    <>
      <GlobalStyle type={type} hasNavBar={hasNavBar} />
      <Suspense fallback={<Loading />}>
        <Outlet />
        {children}
      </Suspense>
    </>
  );
}

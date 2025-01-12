import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStyle } from 'styles/GlobalStyle';
import Loading from 'components/common/Loading';

interface LayoutProps {
  type: 'mobile' | 'admin';
  children?: React.ReactNode;
}

export function Layout({ type, children }: LayoutProps) {
  return (
    <>
      <GlobalStyle type={type} />
      <Suspense fallback={<Loading />}>
        <Outlet />
        {children}
      </Suspense>
    </>
  );
}
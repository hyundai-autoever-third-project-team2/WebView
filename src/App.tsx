import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'components/layouts/Layout';

const MainPage = lazy(() => import('pages/main/MainPage'));
const AdminMainPage = lazy(() => import('pages/admin/AdminMainPage'));
const AdminUserPage = lazy(() => import('pages/admin/AdminUserPage'));

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout type="mobile" />,
      children: [
        {
          path: '/',
          element: <MainPage />
        }
      ]
    },
    {
      path: 'admin',
      element: <Layout type="admin" />,
      children: [
        {
          path: '',
          element: <AdminMainPage />
        },
        {
          path: 'users',
          element: <AdminUserPage />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
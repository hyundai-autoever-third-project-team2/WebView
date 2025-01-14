import { lazy } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { Layout } from 'components/layouts/Layout';
import BottomNavigationBar from 'components/common/BottomNavigationBar/BottomNavigationBar';

const HomePage = lazy(() => import('pages/home/HomePage'));
const WishlistPage = lazy(() => import('pages/wishlist/WishlistPage'));
const MyPage = lazy(() => import('pages/my/MyPage'));
const RegisterCarPage = lazy(() => import('pages/registerCar/RegisterCarPage'));
const FeedPage = lazy(() => import('pages/feed/FeedPage'));
const AddFeedPage = lazy(() => import('pages/feed/AddFeedPage'));
const NotificationPage = lazy(() => import('pages/notification/NotificationPage'));
const FilterPage = lazy(() => import('pages/filter/FilterPage'));
const AdminMainPage = lazy(() => import('pages/admin/AdminMainPage'));
const AdminUserPage = lazy(() => import('pages/admin/AdminUserPage'));
const PurchasePage = lazy(() => import('pages/my/PurchaseHistoryPage'));
const RegisterHistoryPage = lazy(() => import('pages/my/RegisterHistoryPage'));

const webviewRouter: RouteObject[] = [
  // 내비게이션 바가 있는 페이지를 추가해주세요.
  {
    element: (
      <Layout type="mobile">
        <BottomNavigationBar />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'my',
        element: <MyPage />,
      },
    ],
  },
  // 내비게이션 바가 없는 페이지를 추가해주세요.
  {
    element: <Layout type="mobile" />,
    children: [
      {
        path: 'register-car',
        element: <RegisterCarPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'feed/add',
        element: <AddFeedPage />,
      },
      {
        path: 'notification',
        element: <NotificationPage />,
      },
      {
        path: 'filter',
        element: <FilterPage />,
      },
      {
        path: 'my/purchase',
        element: <PurchasePage />,
      },
      {
        path: 'my/register',
        element: <RegisterHistoryPage />,
      },
    ],
  },
];

const adminPageRouter: RouteObject = {
  path: '/admin',
  element: <Layout type="admin" />,
  children: [
    {
      path: '',
      element: <AdminMainPage />,
    },
    {
      path: 'users',
      element: <AdminUserPage />,
    },
  ],
};

function App() {
  const router = createBrowserRouter([...webviewRouter, adminPageRouter]);

  return <RouterProvider router={router} />;
}

export default App;

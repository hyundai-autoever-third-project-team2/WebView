import { lazy } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { Layout } from 'components/layouts/Layout';
import BottomNavigationBar from 'components/common/BottomNavigationBar/BottomNavigationBar';
import { CarDetailPage } from 'pages/carDetail/CarDetailPage';
import { SelectComparePage } from 'pages/compare/SelectComparePage';
import ScrollToTop from 'components/common/ScrollToTop';

const HomePage = lazy(() => import('pages/home/HomePage'));
const WishlistPage = lazy(() => import('pages/wishlist/WishlistPage'));
const MyPage = lazy(() => import('pages/my/MyPage'));
const RegisterCarPage = lazy(() => import('pages/registerCar/RegisterCarPage'));
const FeedPage = lazy(() => import('pages/feed/FeedPage'));
const AddFeedPage = lazy(() => import('pages/feed/AddFeedPage'));
const NotificationPage = lazy(() => import('pages/notification/NotificationPage'));
const CarFilterPage = lazy(() => import('pages/carFilter/CarFilterPage'));
const CarListPage = lazy(() => import('pages/carList/CarListPage'));
const PurchasePage = lazy(() => import('pages/my/PurchaseHistoryPage'));
const RegisterHistoryPage = lazy(() => import('pages/my/RegisterHistoryPage'));
const PurchaseDetailPage = lazy(() => import('pages/my/PurchaseDetailPage'));
const PurchaseCarPage = lazy(() => import('pages/purchaseCar/PurchaseCarPage'));
const ComparePage = lazy(() => import('pages/compare/ComparePage'));
const SearchResultPage = lazy(() => import('pages/searchResult/SearchResultPage'));
const ChatPage = lazy(() => import('pages/chat/ChatPage'));

const webviewRouter: RouteObject[] = [
  // 내비게이션 바가 있는 페이지를 추가해주세요.
  {
    element: (
      <>
        <ScrollToTop />
        <Layout type="mobile" hasNavBar={true}>
          <BottomNavigationBar />
        </Layout>
      </>
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
      {
        path: 'my/purchase/:id',
        element: <PurchaseDetailPage />,
      },
    ],
  },
  // 내비게이션 바가 없는 페이지를 추가해주세요.
  {
    element: (
      <>
        <ScrollToTop />
        <Layout type="mobile" hasNavBar={false} />
      </>
    ),
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
        path: 'car-filter',
        element: <CarFilterPage />,
      },
      {
        path: 'my/purchase',
        element: <PurchasePage />,
      },
      {
        path: 'my/register',
        element: <RegisterHistoryPage />,
      },
      {
        path: 'car-detail/:id',
        element: <CarDetailPage />,
      },
      {
        path: 'select-compare',
        element: <SelectComparePage />,
      },
      {
        path: 'car-list/:type',
        element: <CarListPage />,
      },
      {
        path: 'search',
        element: <SearchResultPage />,
      },
      {
        path: 'purchase/:id',
        element: <PurchaseCarPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'chat/:roomId',
        element: <ChatPage />,
      },
    ],
  },
];

function App() {
  const router = createBrowserRouter([...webviewRouter]);

  return <RouterProvider router={router} />;
}

export default App;

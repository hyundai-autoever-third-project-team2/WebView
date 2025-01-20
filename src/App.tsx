import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import { Layout } from 'components/layouts/Layout';
import BottomNavigationBar from 'components/common/BottomNavigationBar/BottomNavigationBar';
import { CarDetailPage } from 'pages/carDetail/CarDetailPage';
import { SelectComparePage } from 'pages/compare/SelectComparePage';
import ScrollToTop from 'components/common/ScrollToTop';
import { LoginPage } from 'pages/login/LoginPage';
import { RedirectPage } from 'pages/login/RedirectPage';
import { PaymentCompletePage } from 'pages/payment/PaymentCompletePage';
import { PaymentRedirectPage } from 'pages/payment/PaymentRedirectPage';

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
const ChatRoom = lazy(() => import('pages/chat/ChatRoom'));
const NoticePage = lazy(() => import('pages/notice/NoticePage'))
const GuidePage = lazy(()=> import('pages/guide/GuidePage'))

const hasToken = localStorage.getItem('accessToken');

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
        path: '/',
        element: hasToken ? <HomePage /> : <Navigate to="/login" replace />,
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
        path: 'my/purchase/:purchaseId',
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
        path: 'purchase',
        element: <PurchaseCarPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'chat/:roomId',
        element: <ChatRoom />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'success',
        element: <RedirectPage />,
      },
      {
        path: 'notice',
        element: <NoticePage />,
      },
      {
        path: 'guide',
        element: <GuidePage />,
      },
      {
        path: 'payment/success',
        element: <PaymentRedirectPage />,
      },
      {
        path: 'payment/complete',
        element: <PaymentCompletePage />,
      },

    ],
  },
];

function App() {
  const router = createBrowserRouter([...webviewRouter]);

  return <RouterProvider router={router} />;
}

export default App;

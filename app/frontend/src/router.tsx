import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/page/LandingPage';
import Register from './page/Register';
import Login from './page/Login';
import BoxPage from './page/BoxPage';
import OrderListPage from './page/OrderListPage';
import AdminDashboard from './page/AdminDashboard';
import UserDashboard from './page/UserDashboard';
import { MainPage } from './page/MainPage';
import OrderPage from './page/OrderPage';
import PaymentConfirmation from './page/PaymentConfirmation';
import ActivatedEmail from './components/ActivateEmail';
import ActivateEmail from './components/ActivateEmail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />, // LandingPage sebagai parent route
    children: [
      {
        path: '', // Path kosong untuk menandakan route default di bawah LandingPage
        element: <MainPage />, // Halaman utama untuk LandingPage
      },
      {
        path: 'about',
        element: <h1>about</h1>,
      },
      {
        path: 'contact',
        element: <h1>Contact</h1>,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminDashboard />,
    children: [
      {
        path: 'user',
        element: <h1>User</h1>,
      },
      {
        path: 'box',
        element: <BoxPage />,
      },
      {
        path: 'color',
        element: <BoxPage />,
      },
      {
        path: 'decoration',
        element: <BoxPage />,
      },
      {
        path: 'box/color',
        element: <BoxPage />,
      },
      {
        path: 'box/decoration',
        element: <BoxPage />,
      },
      {
        path: 'order',
        element: <OrderListPage />,
      },
      {
        path: 'box/edit/:id',
        element: <OrderListPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <UserDashboard />,
    children: [],
  },
  {
    path: '/user/checkout/:id',
    element: <OrderPage />,
  },
  {
    path: '/user/payment/:id',
    element: <PaymentConfirmation />,
  },
  {
    path: '/activate/email',
    element: <ActivateEmail />,
  },
  {
    path: '/activated/email',
    element: <ActivatedEmail />,
  },
]);

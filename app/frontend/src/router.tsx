import LandingPage from '@/page/LandingPage';
import { createBrowserRouter } from 'react-router-dom';
import {
  default as ActivatedEmail,
  default as ActivateEmail,
} from './components/ActivateEmail';
import MainUser from './components/MainUser';
import AboutPage from './page/AboutPage';
import AdminDashboard from './page/AdminDashboard';
import BoxPage from './page/BoxPage';
import CollectionPage from './page/CollectionPage';
import ColorPage from './page/ColorPage';
import ContactPage from './page/ContactPage';
import DecorationPage from './page/DecorationPage';
import EditBoxPage from './page/EditBoxPage';
import EditProfile from './page/EditProfile';
import Login from './page/Login';
import { MainPage } from './page/MainPage';
import OrderListPage from './page/OrderListPage';
import OrderPage from './page/OrderPage';
import PaymentConfirmation from './page/PaymentConfirmation';
import PaymentSuccessPage from './page/PaymentSuccessPage';
import PricesPage from './page/PricesPage';
import Register from './page/Register';
import TestimoniPage from './page/TestimoniPage';
import UserDashboard from './page/UserDashboard';
import UserTransactionPage from './page/UserTransactionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'collection',
        element: <CollectionPage />,
      },
      { path: 'testimoni', element: <TestimoniPage /> },
      { path: 'prices', element: <PricesPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminDashboard />,
    children: [
      {
        path: '',
        element: <OrderListPage />,
      },
      {
        path: 'box',
        element: <BoxPage />,
      },
      {
        path: 'box/edit/:id',
        element: <EditBoxPage />,
      },
      {
        path: 'color',
        element: <ColorPage />,
      },
      {
        path: 'decoration',
        element: <DecorationPage />,
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
      // {
      //   path: 'box/edit/:id',
      //   element: <EditBoxPage />,
      // },
    ],
  },
  {
    path: '/user',
    element: <UserDashboard />,
    children: [
      {
        path: '',
        element: <MainUser />,
      },
      {
        path: 'checkout',
        element: <OrderPage />,
      },
      {
        path: 'payment/:orderId',
        element: <PaymentConfirmation />,
      },
      {
        path: 'profile/:userId',
        element: <EditProfile />,
      },
      {
        path: 'payment/success/:orderId',
        element: <PaymentSuccessPage />,
      },
      {
        path: 'transaction',
        element: <UserTransactionPage />,
      },
    ],
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

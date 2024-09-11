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
import EditProfile from './page/EditProfile';
import MainUser from './components/MainUser';
import PaymentSuccessPage from './page/PaymentSuccessPage';
import UserTransactionPage from './page/UserTransactionPage';
import ColorPage from './page/ColorPage';
import DecorationPage from './page/DecorationPage';
import AboutPage from './page/AboutPage';
import ContactPage from './page/ContactPage';
import EditBoxPage from './page/EditBoxPage';
import CollectionPage from './page/CollectionPage';
import TestimoniPage from './page/TestimoniPage';
import PricesPage from './page/PricesPage';

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

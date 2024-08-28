import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/page/LandingPage';
import Register from './page/Register';
import Login from './page/Login';
import UserDashboard from './page/UserDashboard';
import { MainPage } from './page/MainPage'

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
    element: <UserDashboard />,
  },
]);

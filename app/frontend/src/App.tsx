import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { RootLayout } from './components/layouts/RootLayout';
import { Toaster } from './components/ui/toaster';
import store from './states';
import { MainPage } from './page/MainPage';
import AboutPage from './page/AboutPage';
import ContactPage from './page/ContactPage';
import CollectionPage from './page/CollectionPage';
import Login from './page/Login';
import Register from './page/Register';
import PricesPage from './page/PricesPage';
import { AuthLayout } from './components/layouts/AuthLayout';
import EmailVerificationPage from './page/EmailVerificationPage';
import { VerifiedEmailPage } from './page/VerifiedEmailPage';
import { ForgotPassword } from './page/ForgotPasswordPage';
import { ForgotPasswordSuccess } from './page/ForgotPasswordSuccess';
import { ResetPasswordPage } from './page/ResetPasswordPage';

const navItems = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: 'Koleksi',
    href: '/collection',
  },
  {
    title: 'Harga',
    href: '/prices',
  },
  {
    title: 'Tentang Kami',
    href: '/about',
  },
  {
    title: 'Kontak',
    href: '/contact',
  },
];

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Routes>
        <Route path='/' element={<RootLayout navItems={navItems} />}>
          <Route path='' element={<MainPage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='collection' element={<CollectionPage />} />
          <Route path='prices' element={<PricesPage />} />

          <Route element={<AuthLayout />}>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='verify-email' element={<EmailVerificationPage />} />
            <Route path='verified-email' element={<VerifiedEmailPage />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route
              path='forgot-password/success'
              element={<ForgotPasswordSuccess />}
            />
            <Route path='reset-password' element={<ResetPasswordPage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

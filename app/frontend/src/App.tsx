import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthLayout } from './components/layouts/AuthLayout';
import { RootLayout } from './components/layouts/RootLayout';
import { ProtectedRoute } from './components/Routes/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import AboutPage from './page/AboutPage';
import CollectionPage from './page/CollectionPage';
import ContactPage from './page/ContactPage';
import EmailVerificationPage from './page/EmailVerificationPage';
import { ForgotPassword } from './page/ForgotPasswordPage';
import { ForgotPasswordSuccess } from './page/ForgotPasswordSuccess';
import Login from './page/Login';
import { MainPage } from './page/MainPage';
import PricesPage from './page/PricesPage';
import Register from './page/Register';
import { ResetPasswordPage } from './page/ResetPasswordPage';
import { VerifiedEmailPage } from './page/VerifiedEmailPage';
import store from './states';
import UserDashboard from './page/UserDashboard';
import MainUser from './components/MainUser';
import OrderPage from './page/OrderPage';
import PaymentConfirmation from './page/PaymentConfirmation';
import EditProfile from './page/EditProfile';
import PaymentSuccessPage from './page/PaymentSuccessPage';
import UserTransactionPage from './page/UserTransactionPage';
import AdminDashboard from './page/AdminDashboard';
import OrderListPage from './page/OrderListPage';
import BoxPage from './page/BoxPage';
import EditBoxPage from './page/EditBoxPage';
import ColorPage from './page/ColorPage';
import DecorationPage from './page/DecorationPage';

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

        <Route element={<ProtectedRoute />}>
          <Route path='/user' element={<UserDashboard />}>
            <Route path='' element={<MainUser />} />
            <Route path='checkout' element={<OrderPage />} />
            <Route path='payment/:orderId' element={<PaymentConfirmation />} />
            <Route path='profile/:userId' element={<EditProfile />} />
            <Route
              path='payment/success/:orderId'
              element={<PaymentSuccessPage />}
            />
            <Route path='transaction' element={<UserTransactionPage />} />
          </Route>

          <Route path='/dashboard' element={<AdminDashboard />}>
            <Route path='' element={<OrderListPage />} />
            <Route path='box' element={<BoxPage />} />
            <Route path='box/edit/:id' element={<EditBoxPage />} />
            <Route path='color' element={<ColorPage />} />
            <Route path='decoration' element={<DecorationPage />} />
            <Route path='box/color' element={<BoxPage />} />
            <Route path='box/decoration' element={<BoxPage />} />
            <Route path='order' element={<OrderListPage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

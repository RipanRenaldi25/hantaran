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
        <Route element={<RootLayout navItems={navItems} />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/collection' element={<CollectionPage />} />
          <Route path='/prices' element={<PricesPage />} />

          <Route element={<AuthLayout />}>
            <Route path='/register' element={<Register />} />
            {/* <Route
              path='/register'
              element={
                <div>
                  <h1>Register</h1>
                  <h1>Register2</h1>
                </div>
              }
            /> */}
            <Route path='/login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

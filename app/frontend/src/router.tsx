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
        element: (
          <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6 mainpage">
            <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-6">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                About Us
              </h1>
              <p className="text-gray-600 text-lg text-center mb-8">
                Welcome to our platform! We are passionate about providing the
                best services and experiences for our customers. Our team works
                tirelessly to ensure your satisfaction and success.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Our Mission
                  </h2>
                  <p className="text-gray-600">
                    To create innovative solutions that empower businesses and
                    individuals to achieve their full potential.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Our Vision
                  </h2>
                  <p className="text-gray-600">
                    To be the global leader in providing cutting-edge services
                    and solutions in the tech industry.
                  </p>
                </div>
              </div>
              {/* <div className="mt-8 flex justify-center">
                <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300">
                  Learn More
                </button>
              </div> */}
            </div>
          </div>
        ),
      },
      {
        path: 'contact',
        element: (
          <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 mainpage">
            <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Contact Us
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Get In Touch
                  </h2>
                  <p className="text-gray-600">
                    We'd love to hear from you! Whether you have a question,
                    feedback, or just want to say hello, feel free to reach out.
                  </p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-700">Email</h3>
                    <p className="text-gray-600">info@example.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Phone</h3>
                    <p className="text-gray-600">+62 812 123-4567</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      Jl. Margahayu Permai No. 123, Kota Bandung, Negara
                      Indonesia
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your message..."
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() =>
                          window.open(
                            `mailto:info@example.com?subject=Message from ${
                              document.querySelector<HTMLInputElement>('#name')
                                ?.value
                            }&body=${
                              document.querySelector<HTMLTextAreaElement>(
                                '#message'
                              )?.value
                            }`,
                            '_blank'
                          )
                        }
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ),
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
        path: '',
        element: <BoxPage />,
      },
      {
        path: 'box',
        element: <BoxPage />,
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
      {
        path: 'box/edit/:id',
        element: <OrderListPage />,
      },
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

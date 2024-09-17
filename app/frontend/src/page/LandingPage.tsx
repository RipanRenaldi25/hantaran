// import { INavItems, Navigation } from '@/components/Navigation';
// import { Toaster } from '@/components/ui/toaster';
// import { useAppSelector } from '@/states';
// import { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// function LandingPage() {
//   const { role } = useAppSelector((state) => state.userLogedIn);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (role === 'admin') {
//       navigate('/dashboard');
//     } else if (role == 'user') {
//       navigate('/user');
//     }
//   }, [role]);
//   const { userLogedIn } = useAppSelector((state) => state);
//   const accessToken = localStorage.getItem('ACCESS_TOKEN');

//   useEffect(() => {
//     if (localStorage.getItem('ACCESS_TOKEN') || userLogedIn.email) {
//       navigate('/dashboard');
//     }
//   }, [userLogedIn.email, accessToken, navigate]);

//   const [navItems] = useState<INavItems[]>([
//     {
//       title: 'Overview',
//       href: '/',
//     },
//     {
//       title: 'About',
//       href: '/about',
//     },
//     {
//       title: 'Contact',
//       href: '/contact',
//     },
//   ]);

//   return (
//     <>
//       <Toaster />
//       <div className="flex flex-col bg-white gap-10">
//         <Navigation navItems={navItems} />
//         <Outlet />

//         <footer className="landinpage-footer min-h-[15vh]">
//           <div className="footer-info">
//             <address>
//               <p>
//                 Alamat: Jl. Margahayu Permai No. 123, Kota Bandung, Negara
//                 Indonesia
//               </p>
//             </address>
//             <div className="footer-contact">
//               <p>Telepon: 082121087879 </p>
//               <p>Email: salmanabdussalam@gmail.com</p>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p>&copy; 2024 HantaranByJoo. All rights reserved.</p>
//           </div>
//         </footer>
//       </div>
//     </>
//   );
// }

// export default LandingPage;

import logo from '@/assets/Logo.png';
import {
  Clock,
  Instagram,
  MapPinHouse,
  Menu,
  Phone,
  Twitter,
  X,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <article className="bg-gradient-to-r from-[#FFF7E7] to-white overflow-x-hidden">
      <header className="justify-between items-center md:px-16 md:py-8 px-5 py-2 md:text-xl lg:text-2xl">
        <section className="hidden md:flex md:justify-between">
          <div className="items-center gap-4 flex">
            <div>
              <img src={logo} className="size-10 md:size-16 lg:size-20" />
            </div>
            <nav className="flex justify-between gap-10">
              <ul className="flex gap-5">
                <li>
                  <NavLink to="#">Home</NavLink>
                </li>
                <li>
                  <NavLink to="#">About</NavLink>
                </li>
                <li>
                  <NavLink to="#">Events</NavLink>
                </li>
                <li>
                  <NavLink to="#">Contacts</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <button className="text-red-500 border px-6 py-2 rounded-md shadow-sm">
            Lets talk
          </button>
        </section>
        <section className="md:hidden flex justify-end">
          <Menu
            className="size-7 hover:cursor-pointer mt-2"
            onClick={() => setIsOpen(true)}
          />
          <div>
            <div
              className={`flex flex-col text-center transition-all ease-out duration-300 bg-white fixed ${
                isOpen
                  ? 'left-0 top-0 right-0 bottom-0 opacity-100'
                  : '-left-[100%] opacity-0'
              } z-50`}
            >
              <header className="relative flex items-center justify-between px-4 py-4 shadow-md">
                <div className="flex items-center gap-2 font-thin">
                  <img src={logo} className="size-10" />
                  <h1>Logo</h1>
                </div>
                <X
                  className={`${
                    isOpen
                      ? 'absolute right-2 opacity-100'
                      : '-right-[100%] opacity-0'
                  } transition-all ease-out duration-300`}
                  onClick={() => setIsOpen(false)}
                />
              </header>
              <div className="flex flex-col gap-5">
                <NavLink to="#" className="bg-yellow-500 py-3">
                  Home
                </NavLink>
                <NavLink to="#" className="bg-yellow-500 py-3">
                  Home
                </NavLink>
                <NavLink to="#" className="bg-yellow-500 py-3">
                  Home
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </header>
      <Outlet />
      <footer className="flex flex-col gap-3 py-10 justify-center items-center bg-white px-5 md:text-2xl">
        <header>
          <div className="flex gap-1 md:gap-3 items-center">
            <img src={logo} className="size-8 md:size-20" />
            <h1 className="text-2xl">HantaranByJoo</h1>
          </div>
        </header>
        <main className="flex flex-col gap-3 md:gap-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:p-4">
          <section className="flex flex-col items-center justify-center border w-[80vw] lg:w-[40vw] py-4 text-center px-2 gap-1 md:py-8 md:px-4">
            <h1 className="text-xl font-semibold md:text-3xl">Contact Us</h1>
            <p>You can call us by WhatsApp our number</p>
            <div className="flex gap-1 items-center">
              <Phone className="size-5 md:size-8" />
              <p>+62 812-3456-7890</p>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center border w-[80vw] lg:w-[40vw] py-4 text-center px-2 gap-1 md:py-8 md:px-4">
            <h1 className="text-xl font-semibold  md:text-3xl">
              Working Hours
            </h1>
            <p>Working hours of our teams</p>
            <div className="flex gap-1 items-center md:gap-2">
              <Clock className="size-5 md:size-8" />
              <p>08.00 - 17.00 (everyday)</p>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center border w-[80vw] lg:w-[40vw] py-4 text-center px-2 gap-1 md:gap-2 md:py-8 md:px-4">
            <h1 className="text-xl font-semibold md:text-3xl">Addresses</h1>
            <div className="flex gap-1 md:gap-2 items-start md:items-center">
              <MapPinHouse className="size-6 md:size-10" />
              <p className="w-2/3 md:w-full text-sm font-thin md:text-2xl">
                Jalan Binakarya 1 nomer 45 RT 005 RW 027
              </p>
            </div>
          </section>
        </main>
        {/* <section className="flex gap-3 items-center">
          <Instagram className="border p-2 rounded-full" />
          <Youtube />
          <Twitter />
        </section> */}
      </footer>
    </article>
  );
};

export default LandingPage;

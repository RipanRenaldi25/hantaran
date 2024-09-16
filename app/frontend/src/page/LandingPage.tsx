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
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <article className="bg-gradient-to-r from-[#FFF7E7] to-white overflow-x-hidden">
      <header className="justify-between items-center md:px-16 md:py-8 px-5 py-2">
        <section className="hidden md:flex md:justify-between">
          <div className="items-center gap-4 flex">
            <div>
              <img src={logo} className="size-10" />
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
    </article>
  );
};

export default LandingPage;

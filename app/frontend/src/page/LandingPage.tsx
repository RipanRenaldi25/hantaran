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
import buket from '@/assets/bouquet.jpg';
import flower from '@/assets/flower.jpg';
import hand from '@/assets/hand.jpg';
import weddingBg from '@/assets/wedding-bg.jpg';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log({ isOpen });
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
      <section className="px-10 flex justify-between gap-10">
        <div className="flex-1">
          <div className="mb-5 text-5xl font-thin">
            <h1>Hi There</h1>
            <h1>This is</h1>
            <h1>~ Hantaran By Joo</h1>
          </div>
          <p className="text-sm mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            corporis repudiandae harum nemo, accusamus consequuntur eius
            laudantium, explicabo enim ducimus eum repellendus vero suscipit ex
            provident saepe expedita aliquam labore!
          </p>
          <button className="bg-red-700 text-white font-semibold px-6 py-2 rounded-md">
            Get in touch
          </button>
        </div>
        <div className="relative flex-1 flex">
          <img src={buket} alt="hero" className="w-[500px] h-[600px] z-40" />
          <img
            src={hand}
            className="absolute z-20 rotate-3 w-[500px] h-[600px]"
          />
          <img
            src={weddingBg}
            className="w-[500px] h-[600px] absolute z-10 rotate-6"
          />
          <img
            src={flower}
            className="absolute z-40 size-40 rounded-t-full left-0 -translate-x-1/2 bottom-5 shadow-md "
          />
        </div>
      </section>
    </article>
  );
};

export default LandingPage;

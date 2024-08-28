import { INavItems, Navigation } from '@/components/Navigation';
import { useAppSelector } from '@/components/states';
import { Toaster } from '@/components/ui/toaster';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const { userLogedIn } = useAppSelector((state) => state);
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    if (localStorage.getItem('ACCESS_TOKEN') || userLogedIn.email) {
      navigate('/dashboard');
    }
  }, [userLogedIn.email, accessToken, navigate]);

  const [navItems] = useState<INavItems[]>([
    {
      title: 'Overview',
      href: '/',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col">
        <Navigation navItems={navItems} />
        <Outlet />

      

        <footer>
            <div className="footer-info">
                <address>
                    <p>Alamat: Jl. Margahayu Permai No. 123, Kota Bandung, Negara Indonesia</p>
                </address>
                <div className="footer-contact">
                    <p>Telepon: 082121087879 </p>
                    <p>Email: salmanabdussalam@gmail.com</p>
                </div>
            </div>
        <div className="footer-bottom">
            <p>&copy; 2024 HantaranByJoo. All rights reserved.</p>
        </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;

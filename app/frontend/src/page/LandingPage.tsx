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
        <h1>Footer</h1>
      </div>
    </>
  );
}

export default LandingPage;

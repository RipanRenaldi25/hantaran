import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from '@/components/Sidebar';

import { Toaster } from '@/components/ui/toaster';

import { Header } from '@/components/UserHeader';
import { useAppSelector } from '@/states';

export type NavListType = {
  title: string;
  path: string;
  isActive: boolean;
};

const UserDashboard = () => {
  const { pathname } = useLocation();
  const isPathActive = (path: string) => {
    return pathname.includes(path);
  };
  const [navList, setNavList] = useState<NavListType[]>([
    {
      title: 'Home',
      path: '',
      isActive: isPathActive(''),
    },
    {
      title: 'Cart',
      path: 'cart',
      isActive: isPathActive('cart'),
    },
    {
      title: 'Transactions',
      path: 'transaction',
      isActive: isPathActive('transaction'),
    },
  ]);
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const navigate = useNavigate();
  const { userLoginWithProfile } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (
      !localStorage.getItem('ROLE') &&
      !localStorage.getItem('ACCESS_TOKEN')
    ) {
      navigate('/');
    }
    if (
      localStorage.getItem('ROLE') === 'admin' &&
      userLogin.role === 'admin'
    ) {
      navigate('/dashboard');
    }
  }, [localStorage.getItem('ROLE'), localStorage.getItem('ACCESS_TOKEN')]);
  return (
    <article>
      <Toaster />
      <Header
        username={userLoginWithProfile?.username}
        avatar={userLoginWithProfile?.avatar}
        userId={userLoginWithProfile?.id}
        navList={navList}
        setNavList={setNavList}
      />
      <Outlet />
    </article>
  );
};

export default UserDashboard;

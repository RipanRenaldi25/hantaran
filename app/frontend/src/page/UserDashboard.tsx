import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import Sidebar from '@/components/Sidebar';

import { Toaster } from '@/components/ui/toaster';

import { Header } from '@/components/UserHeader';
import { getUserWithProfile } from '@/feature/user';
import { useAppDispatch, useAppSelector } from '@/states';
import { resetUserLogedIn } from '@/states/UserLogedInState';
import { setUserLoginWithProfile } from '@/states/userState';
import { Button } from '@/components/ui/button';

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
      title: 'Transactions',
      path: 'transaction',
      isActive: isPathActive('transaction'),
    },
  ]);
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const navigate = useNavigate();
  const { userLoginWithProfile } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const getUserProfileById = async () => {
    const user = await getUserWithProfile();
    dispatch(setUserLoginWithProfile(user));
  };
  console.log({ userLoginWithProfile });
  useEffect(() => {
    getUserProfileById();
    if (
      !localStorage.getItem('ROLE') &&
      !localStorage.getItem('ACCESS_TOKEN')
    ) {
      navigate('/');
      dispatch(resetUserLogedIn());
    }
    if (
      localStorage.getItem('ROLE') === 'admin' &&
      userLogin.role === 'admin'
    ) {
      navigate('/dashboard');
    }
  }, [localStorage.getItem('ROLE'), localStorage.getItem('ACCESS_TOKEN')]);
  return (
    <article className="relative">
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

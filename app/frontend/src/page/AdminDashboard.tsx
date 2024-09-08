import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/states';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { LayoutDashboard } from 'lucide-react';
import { getUserWithProfile } from '@/feature/user';
import { setUserLoginWithProfile } from '@/states/userState';
import { resetUserLogedIn } from '@/states/UserLogedInState';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const { state } = useLocation();
  const [sidebarItems, setSidebarItems] = useState([
    // { icon: LayoutDashboard, title: 'Dashboard', path: '', isActive: true },
    { icon: LayoutDashboard, title: 'Box', path: 'box', isActive: true },
    {
      icon: LayoutDashboard,
      title: 'Color',
      path: 'color',
      isActive: false,
    },
    {
      icon: LayoutDashboard,
      title: 'Decoration',
      path: 'decoration',
      isActive: false,
    },
  ]);

  const getUserLoginWithProfile = async () => {
    const user = await getUserWithProfile();
    dispatch(setUserLoginWithProfile(user));
  };
  useEffect(() => {
    if (
      !localStorage.getItem('ROLE') ||
      !localStorage.getItem('ACCESS_TOKEN')
    ) {
      navigate('/');
      dispatch(resetUserLogedIn());
      return;
    }
    if (localStorage.getItem('ROLE') !== 'admin') {
      navigate('/user');
      return;
    }
    getUserLoginWithProfile();
  }, [
    state,
    userLogin,
    localStorage.getItem('ACCESS_TOKEN'),
    localStorage.getItem('ROLE'),
  ]);

  const { userLoginWithProfile } = useAppSelector((state) => state.user);

  return (
    <article className="flex gap-4 bg-slate-200">
      <Sidebar
        sidebarItems={sidebarItems}
        setSidebarItems={setSidebarItems}
        user={userLoginWithProfile}
      />
      <main className="py-6 md:max-w-[calc(100vw-25vw-40px)] lg:max-w-[calc(100vw-25vw-40px)] xl:max-w-[calc(100vw-15vw-40px)] overflow-x-hidden min-w-[calc(100vw-15vw-40px)]">
        <Outlet />
      </main>
    </article>
  );
};

export default AdminDashboard;

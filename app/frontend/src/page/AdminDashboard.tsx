import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/states';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { LayoutDashboard } from 'lucide-react';
import { getUserWithProfile } from '@/feature/user';
import { setUserLoginWithProfile } from '@/states/userState';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const { state } = useLocation();
  const [sidebarItems, setSidebarItems] = useState([
    { icon: LayoutDashboard, title: 'Dashboard', path: '', isActive: true },
    { icon: LayoutDashboard, title: 'Box', path: 'box', isActive: false },
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
    {
      icon: LayoutDashboard,
      title: 'Box Colors',
      path: 'box/color',
      isActive: false,
    },
    {
      icon: LayoutDashboard,
      title: 'Box Decoration',
      path: 'box/decoration',
      isActive: false,
    },
    { icon: LayoutDashboard, title: 'Order', path: 'order', isActive: false },
    { icon: LayoutDashboard, title: 'User', path: 'user', isActive: false },

    { icon: LayoutDashboard, title: 'User', path: 'user', isActive: false },
  ]);
  if (!localStorage.getItem('ACCESS_TOKEN')) {
    navigate('/');
  }
  const getUserLoginWithProfile = async () => {
    const user = await getUserWithProfile();
    dispatch(setUserLoginWithProfile(user));
  };
  useEffect(() => {
    if (
      userLogin?.role === 'user' ||
      state?.role === 'user' ||
      localStorage.getItem('ROLE') === 'user'
    ) {
      navigate('/user');
    }
    getUserLoginWithProfile();
  }, [state, userLogin]);

  const { userLoginWithProfile } = useAppSelector((state) => state.user);

  return (
    <article className="flex gap-4">
      <Sidebar
        sidebarItems={sidebarItems}
        setSidebarItems={setSidebarItems}
        user={userLoginWithProfile}
      />
      <main className="py-4">
        <Outlet />
      </main>
    </article>
  );
};

export default AdminDashboard;

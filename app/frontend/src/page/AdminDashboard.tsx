import Sidebar from '@/components/Sidebar';
import { getUserWithProfile } from '@/feature/user';
import { useAppDispatch, useAppSelector } from '@/states';
import { resetUserLogedIn } from '@/states/UserLogedInState';
import { setUserLoginWithProfile } from '@/states/userState';
import { Box, Palette, Receipt, Ribbon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const { state } = useLocation();
  const { pathname } = useLocation();
  console.log({ pathname });
  const [sidebarItems, setSidebarItems] = useState([
    // { icon: LayoutDashboard, title: 'Dashboard', path: '', isActive: true },
    {
      icon: Receipt,
      title: 'Order',
      path: 'order',
      isActive: pathname === '/dashboard/order' || pathname === '/dashboard',
    },
    {
      icon: Box,
      title: 'Box',
      path: 'box',
      isActive: pathname === '/dashboard/box',
    },
    {
      icon: Palette,
      title: 'Color',
      path: 'color',
      isActive: pathname === '/dashboard/color',
    },
    {
      icon: Ribbon,
      title: 'Decoration',
      path: 'decoration',
      isActive: pathname === '/dashboard/decoration',
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

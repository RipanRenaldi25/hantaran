import Sidebar from '@/components/Sidebar';
import { getUserWithProfile } from '@/feature/user';
import { useAppDispatch, useAppSelector } from '@/states';
import { resetUserLogedIn } from '@/states/UserLogedInState';
import { setUserLoginWithProfile } from '@/states/userState';
import { Box, Palette, Receipt, Ribbon, Calendar as CalendarIcon, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const { pathname } = useLocation();

  const [sidebarItems, setSidebarItems] = useState([
    {
      icon: Receipt,
      title: 'Kelola Pesanan',
      path: 'order',
      isActive: pathname === '/dashboard/order' || pathname === '/dashboard',
    },
    {
      icon: Box,
      title: 'Kelola Kotak Hantaran',
      path: 'box',
      isActive: pathname.includes('/dashboard/box'),
    },
    {
      icon: Palette,
      title: 'Pilihan Warna',
      path: 'color',
      isActive: pathname.includes('/dashboard/color'),
    },
    {
      icon: Ribbon,
      title: 'Pilihan Dekorasi',
      path: 'decoration',
      isActive: pathname.includes('/dashboard/decoration'),
    },
  ]);

  const getUserLoginWithProfile = async () => {
    const user = await getUserWithProfile();
    dispatch(setUserLoginWithProfile(user));
  };

  useEffect(() => {
    const role = localStorage.getItem('ROLE');
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (!role || !token) {
      navigate('/');
      dispatch(resetUserLogedIn());
      return;
    }
    if (role !== 'admin') {
      navigate('/user');
      return;
    }
    getUserLoginWithProfile();
  }, [userLogin.role]);

  const { userLoginWithProfile } = useAppSelector((state) => state.user);

  // Sync active item when path changes
  useEffect(() => {
    setSidebarItems((prev) =>
      prev.map((item) => {
        if (item.path === 'order') {
          return {
            ...item,
            isActive: pathname === '/dashboard/order' || pathname === '/dashboard',
          };
        }
        return {
          ...item,
          isActive: pathname.includes(`/dashboard/${item.path}`),
        };
      })
    );
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-[#FBF9F7] text-foreground">
      {/* Sidebar Navigation */}
      <Sidebar
        sidebarItems={sidebarItems}
        setSidebarItems={setSidebarItems}
        user={userLoginWithProfile}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-border px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex flex-col">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground capitalize">
              {pathname === '/dashboard' || pathname === '/dashboard/order'
                ? 'Manajemen Pesanan'
                : pathname.includes('/dashboard/box')
                ? 'Katalog Kotak Hantaran'
                : pathname.includes('/dashboard/color')
                ? 'Master Pilihan Warna'
                : pathname.includes('/dashboard/decoration')
                ? 'Master Pilihan Dekorasi'
                : 'Admin Dashboard'}
            </h1>
            <span className="text-xs text-muted-foreground">
              Kelola inventaris dan status pesanan pernikahan dengan mudah
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-xs text-foreground font-medium border border-border/80">
              <CalendarIcon className="w-3.5 h-3.5 text-primary" />
              <span>{format(new Date(), 'dd MMMM yyyy')}</span>
            </div>

            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/60">
              <Bell className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="p-6 sm:p-10 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

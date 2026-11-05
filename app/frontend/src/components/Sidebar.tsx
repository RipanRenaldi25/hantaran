import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IUserWithProfileAndAddress } from '@/states/interface';
import { NavLink, useNavigate } from 'react-router-dom';
import { ISidebarItem } from './SidebarItem';
import SidebarList from './SidebarList';
import logo from '@/assets/Logo.png';
import { LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

export interface ISidebar {
  sidebarItems: Omit<ISidebarItem, 'setSidebarItems'>[];
  setSidebarItems: any;
  user: IUserWithProfileAndAddress;
}

const Sidebar = ({ setSidebarItems, sidebarItems = [], user }: ISidebar) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ROLE');
    navigate('/login');
  };

  return (
    <aside className="w-64 lg:w-72 shrink-0 bg-[#231E1C] text-stone-200 min-h-screen border-r border-stone-800 flex flex-col justify-between transition-all">
      <div>
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-stone-800/80 flex items-center justify-between">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-stone-700 shadow-xs group-hover:scale-105 transition-transform">
              <img
                src={logo}
                alt="Logo HantaranByJoo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-primary transition-colors">
                HantaranByJoo
              </span>
              <span className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-primary" /> Admin Portal
              </span>
            </div>
          </NavLink>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-stone-900/80 border border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="w-10 h-10 border border-stone-700 shrink-0">
              <AvatarImage
                src={
                  user?.avatar
                    ? `${import.meta.env.VITE_API_BASE_URL}/public/${user.avatar}`
                    : undefined
                }
              />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">
                {user?.full_name || user?.username || 'Administrator'}
              </span>
              <span className="text-xs text-stone-400 truncate">
                {user?.email || 'admin@hantaran.id'}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                aria-label="Menu akun admin"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Akun Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Section */}
        <div className="px-3 pt-2">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Menu Utama
          </span>
          <SidebarList
            sidebarItems={sidebarItems}
            setSidebarItems={setSidebarItems}
          />
        </div>
      </div>

      {/* Footer Section: View Public Website & Logout */}
      <div className="p-4 border-t border-stone-800/80 flex flex-col gap-2">
        <NavLink
          to="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Website Publik</span>
          </span>
          <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded-full text-stone-400">
            Preview
          </span>
        </NavLink>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full min-h-[40px] rounded-xl border-stone-800 bg-stone-900/60 hover:bg-destructive hover:text-destructive-foreground text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar dari Dashboard</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;

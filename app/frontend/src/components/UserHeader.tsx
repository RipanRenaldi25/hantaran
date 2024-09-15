import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { NavListType } from '@/page/UserDashboard';
import { NavLink } from 'react-router-dom';
export const Header = ({
  username = '',
  avatar,
  userId,
  navList = [],
  setNavList,
}: {
  username: string;
  avatar: string;
  userId: string;
  navList: NavListType[];
  setNavList: any;
}) => {
  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center text-lg">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage
                src={
                  `${import.meta.env.VITE_API_BASE_URL}/public/${avatar}` ||
                  'https://github.com/shadcn.png'
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <NavLink to={`/user/profile/${userId}`}>Profile</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NavLink
                to=""
                onClick={() => {
                  localStorage.removeItem('ACCESS_TOKEN');
                  localStorage.removeItem('ROLE');
                }}
              >
                Logout
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-lg font-bold">{username || ''}</div>
      </div>
      <nav className="flex space-x-6">
        {navList.map((item) => (
          <NavLink
            to={item.path}
            className={`text-gray-800 ${item.isActive && 'font-bold'}`}
            id={item.path}
            onClick={() =>
              setNavList((prevNavlist: any[]) =>
                prevNavlist.map((nav) => ({
                  ...nav,
                  isActive: nav.path === item.path,
                }))
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

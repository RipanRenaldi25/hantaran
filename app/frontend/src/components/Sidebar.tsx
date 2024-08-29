import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavLink } from 'react-router-dom';
import SidebarList from './SidebarList';
import { ISidebarItem } from './SidebarItem';
import { IUserWithProfile } from '@/states/interface';
import logo from '@/assets/Logo.png';

export interface ISidebar {
  sidebarItems: Omit<ISidebarItem, 'setSidebarItems'>[];
  setSidebarItems: any;
  user: IUserWithProfile;
}

const Sidebar = ({ setSidebarItems, sidebarItems = [], user }: ISidebar) => {
  return (
    <aside className="bg-black min-h-screen lg:w-60 shadow-md text-white min-w-[calc(100vw-85vw)]">
      <header className="flex gap-4 justify-between border-b border-0.5 border-gray-400 px-4 py-2 items-center">
        <div className="overflow-hidden">
          <img src={logo} width={40} />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hover:cursor-pointer">
                <AvatarImage
                  src={`${import.meta.env.VITE_API_BASE_URL}/public/${
                    user?.avatar
                  }`}
                />
                <AvatarFallback className="text-black">A</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/profile">Profile</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
        </div>
      </header>
      <main>
        <SidebarList
          sidebarItems={sidebarItems}
          setSidebarItems={setSidebarItems}
        />
      </main>
      <footer></footer>
    </aside>
  );
};

export default Sidebar;

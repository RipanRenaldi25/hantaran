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

export interface ISidebar {
  sidebarItems: Omit<ISidebarItem, 'setSidebarItems'>[];
  setSidebarItems: any;
}

const Sidebar = ({ setSidebarItems, sidebarItems = [] }: ISidebar) => {
  return (
    <aside className="bg-black min-h-screen lg:w-60 shadow-md text-white min-w-[calc(100vw-85vw)]">
      <header className="flex gap-4 justify-between border-b border-0.5 border-gray-400 px-4 py-2 items-center">
        <div className="flex gap-2">
          <span>Logo</span>
          <span>Hantaran</span>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="hover:cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/profile">Profile</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink to="/logout">Logout</NavLink>
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

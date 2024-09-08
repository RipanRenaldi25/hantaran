import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '@/assets/Logo.png';

export interface INavItems {
  title: string;
  href: string;
}

export interface INavigationProps {
  navItems: INavItems[];
}

export const Navigation = ({ navItems }: INavigationProps) => {
  const navigate = useNavigate();
  return (
    <header className=" py-6 shadow-lg bg-gradient-to-tr from-white to-gray-200">
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fill-opacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,192C672,203,768,245,864,250.7C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg> */}
      <nav className="flex items-center justify-between px-10 py-2">
        <div
          className="flex items-center justify-start gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="overflow-hidden rounded-full">
            <img src={logo} alt="Logo hantaran" width={60} />
          </div>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-5">
              {navItems.map((item: { title: string; href: string }) => (
                <NavigationMenuLink asChild key={item?.href}>
                  <NavLink to={item?.href} className="text-xl">
                    {item.title}
                  </NavLink>
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-6">
          <div>
            <button
              className="px-10 py-1 border font-bold border-white shadow-d mainpage"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
          <div>
            <button
              className="px-10 py-1 text-white font-bold bg-[#EE5050]"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

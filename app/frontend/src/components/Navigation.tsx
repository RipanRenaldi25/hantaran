import logo from '@/assets/Logo.png';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavLink, useNavigate } from 'react-router-dom';

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
    <header className="sm:max-h-[100%] py-6 shadow-lg bg-gradient-to-tr from-white to-gray-200 sticky top-0 z-30 max-h-[15vh]">
      <nav className="flex items-center justify-between px-10 py-2">
        <div className="flex items-center justify-start gap-10 cursor-pointer">
          <div
            className="overflow-hidden rounded-full"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Logo hantaran" width={60} />
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
        </div>

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

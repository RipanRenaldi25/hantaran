import { INavItems, Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';
import { FooterComponent } from '../FooterComponent';

interface IRootLayoutProps {
  navItems: INavItems[];
}

export const RootLayout = ({ navItems }: IRootLayoutProps) => {
  return (
    <>
      <Toaster />
      <div className='flex flex-col min-h-screen bg-background text-foreground '>
        <Navigation navItems={navItems} />
        <div className='flex flex-col flex-1'>
          <Outlet />
        </div>
        <FooterComponent navItems={navItems} />
      </div>
    </>
  );
};

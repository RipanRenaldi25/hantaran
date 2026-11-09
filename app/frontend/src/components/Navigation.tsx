import { useState } from 'react';
import logo from '@/assets/Logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface INavItems {
  title: string;
  href: string;
}

export interface INavigationProps {
  navItems: INavItems[];
}

export const Navigation = ({ navItems }: INavigationProps) => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className='sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-xs transition-all box-border'>
      <nav
        aria-label='Navigasi Utama'
        className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between'
      >
        <NavLink
          to='/'
          className='flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1.5 transition-all whitespace-nowrap'
          aria-label='HantaranByJoo - Kembali ke Beranda'
        >
          <div className='w-11 h-11 rounded-full overflow-hidden border border-border shadow-xs group-hover:scale-105 transition-transform bg-white flex items-center justify-center'>
            <img
              src={logo}
              alt='Logo HantaranByJoo'
              className='w-full h-full object-cover shrink-0'
              width={44}
              height={44}
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-serif text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors'>
              HantaranByJoo
            </span>
          </div>
        </NavLink>

        <div className='hidden md:flex items-center gap-1.5'>
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isActive
                    ? 'text-primary bg-primary/10 font-semibold shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70',
                )
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className='hidden md:flex items-center gap-3'>
          <Button
            type='button'
            variant='outline'
            className='min-h-[44px] px-5 rounded-full border-border hover:bg-secondary text-foreground font-medium transition-all'
            onClick={() => navigate('/register')}
          >
            Daftar
          </Button>
          <Button
            type='button'
            className='min-h-[44px] px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-xs transition-all hover:shadow-md'
            onClick={() => navigate('/login')}
          >
            Masuk
          </Button>
        </div>

        <div className='flex md:hidden items-center gap-2'>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='min-h-[44px] min-w-[44px] rounded-xl text-foreground hover:bg-secondary'
                aria-label='Buka menu navigasi'
              >
                <Menu className='w-6 h-6' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[85vw] sm:w-[380px] p-6 flex flex-col justify-between'
            >
              <div>
                <SheetHeader className='text-left pb-4 border-b border-border'>
                  <SheetTitle className='flex items-center gap-3'>
                    <img
                      src={logo}
                      alt='Logo'
                      className='w-9 h-9 rounded-full border border-border'
                    />
                    <span className='font-serif text-lg font-bold text-foreground'>
                      HantaranByJoo
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className='py-6 flex flex-col gap-1.5'>
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'px-4 py-3 text-base font-medium rounded-xl transition-colors min-h-[44px] flex items-center justify-between',
                          isActive
                            ? 'text-primary bg-primary/10 font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70',
                        )
                      }
                    >
                      <span>{item.title}</span>
                      {item.href === '/collection' && (
                        <span className='inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/15 text-primary px-2 py-0.5 rounded-full'>
                          <Sparkles className='w-3 h-3' /> Baru
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className='pt-6 border-t border-border flex flex-col gap-3'>
                <Button
                  className='w-full min-h-[44px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate('/login');
                  }}
                >
                  Masuk ke Akun
                </Button>
                <Button
                  variant='outline'
                  className='w-full min-h-[44px] rounded-xl border-border text-foreground font-semibold'
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate('/register');
                  }}
                >
                  Daftar Akun Baru
                </Button>
                <p className='text-center text-xs text-muted-foreground mt-2'>
                  Konsultasi seserahan impian Anda bersama kami.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

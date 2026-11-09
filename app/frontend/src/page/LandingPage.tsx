import { useState, useEffect } from 'react';
import { INavItems, Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { useAppSelector } from '@/states';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Clock,
} from 'lucide-react';
import logo from '@/assets/Logo.png';

function LandingPage() {
  const { role } = useAppSelector((state) => state.userLogedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem('ROLE');
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (token) {
      if (role === 'admin' || storedRole === 'admin') {
        navigate('/dashboard');
      } else if (role === 'user' || storedRole === 'user') {
        navigate('/user');
      }
    }
  }, [role, navigate]);

  const [navItems] = useState<INavItems[]>([
    {
      title: 'Beranda',
      href: '/',
    },
    {
      title: 'Koleksi',
      href: '/collection',
    },
    {
      title: 'Harga',
      href: '/prices',
    },
    {
      title: 'Tentang Kami',
      href: '/about',
    },
    {
      title: 'Kontak',
      href: '/contact',
    },
  ]);

  return (
    <>
      <Toaster />
      <div className='flex flex-col min-h-screen bg-background text-foreground '>
        <Navigation navItems={navItems} />
        <div className='flex flex-col flex-1 '>
          <Outlet />
        </div>

        <footer className='bg-[#231E1C] text-stone-200  border-t border-stone-800 w-full'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-stone-700'>
                    <img
                      src={logo}
                      alt='HantaranByJoo'
                      className='w-full h-full object-cover rounded-full'
                    />
                  </div>
                  <span className='font-serif text-xl font-bold tracking-wide text-white'>
                    HantaranByJoo
                  </span>
                </div>
                <p className='text-sm text-stone-300 leading-relaxed'>
                  Layanan sewa dan dekorasi hantaran seserahan pernikahan modern
                  & elegan. Menghadirkan keindahan dan sentuhan personal di hari
                  paling bahagia Anda.
                </p>
                <div className='flex items-center gap-2 text-xs text-stone-400 mt-2'>
                  <Heart className='w-4 h-4 text-primary fill-primary' />
                  <span>Dibuat dengan cinta untuk calon pengantin</span>
                </div>
              </div>
              <div>
                <h3 className='text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2'>
                  <Sparkles className='w-4 h-4 text-primary' />
                  Jelajahi
                </h3>
                <ul className='flex flex-col gap-2.5 text-sm'>
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        className='text-stone-300 hover:text-white hover:underline underline-offset-4 transition-colors'
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2'>
                  <ShieldCheck className='w-4 h-4 text-primary' />
                  Layanan Kami
                </h3>
                <ul className='flex flex-col gap-3 text-sm text-stone-300'>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 rounded-full bg-primary mt-2'></span>
                    <span>Sewa Kotak Hantaran Akrilik Premium</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 rounded-full bg-primary mt-2'></span>
                    <span>Kustomisasi Warna Pita & Dekorasi Bunga</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 rounded-full bg-primary mt-2'></span>
                    <span>Jasa Penataan & Hias Seserahan</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <Clock className='w-4 h-4 text-stone-400 mt-0.5 shrink-0' />
                    <span>Buka Setiap Hari: 08.00 - 21.00 WIB</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-primary' />
                  Hubungi Kami
                </h3>
                <address className='not-italic flex flex-col gap-3 text-sm text-stone-300'>
                  <div className='flex items-start gap-2.5'>
                    <MapPin className='w-4 h-4 text-primary shrink-0 mt-0.5' />
                    <span>
                      Jl. Margahayu Permai No. 123, Kota Bandung, Jawa Barat
                    </span>
                  </div>
                  <div className='flex items-center gap-2.5'>
                    <Phone className='w-4 h-4 text-primary shrink-0' />
                    <a
                      href='tel:082121087879'
                      className='hover:text-white hover:underline transition-colors'
                    >
                      0821-2108-7879
                    </a>
                  </div>
                  <div className='flex items-center gap-2.5'>
                    <Mail className='w-4 h-4 text-primary shrink-0' />
                    <a
                      href='mailto:salmanabdussalam@gmail.com'
                      className='hover:text-white hover:underline transition-colors truncate'
                    >
                      salmanabdussalam@gmail.com
                    </a>
                  </div>
                  <div className='flex items-center gap-2 mt-2 pt-2 border-t border-stone-800 text-xs text-stone-400'>
                    <CreditCard className='w-4 h-4 text-stone-400' />
                    <span>Mendukung Transfer Bank & QRIS</span>
                  </div>
                </address>
              </div>
            </div>

            <div className='mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400'>
              <p>
                &copy; {new Date().getFullYear()} HantaranByJoo. All rights
                reserved.
              </p>
              <p className='flex items-center gap-1'>
                Dirancang untuk memudahkan persiapan hari bahagia Anda.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;

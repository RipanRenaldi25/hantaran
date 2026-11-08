import { INavItems, Navigation } from '@/components/Navigation';
import {
  ArrowLeft,
  ChevronLeft,
  Clock,
  Loader2,
  Mail,
  MailCheck,
  MessageCircle,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import csImage from '@/assets/cs.png';
import { useEffect, useState } from 'react';
import { formatTimer } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { sendForgotPasswordLink } from '@/feature/user';

const navItems: INavItems[] = [
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
];

// Reaktif terhadap resize, berbeda dengan `window.innerWidth` yang hanya
// dibaca sekali saat render pertama.
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export const ForgotPasswordSuccess = () => {
  const navigate = useNavigate();
  // 768px = breakpoint `md` Tailwind, supaya sama dengan class `md:` di bawah
  const isLaptop = useMediaQuery('(min-width: 768px)');
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const getCurrentTime = () => {
    const targetTimer = Number(
      sessionStorage.getItem('forgotPasswordSuccessTime'),
    );
    if (!targetTimer) {
      return 0;
    }
    const currentTime = Date.now();
    const remainingTime = Math.floor((targetTimer - currentTime) / 1000);
    if (remainingTime < 0) {
      return 0;
    }
    return remainingTime;
  };
  const [timer, setTimer] = useState<number>(() => getCurrentTime());
  const [isForgotPasswordSent, setIsForgotPasswordSent] =
    useState<boolean>(false);

  const initTimer = () => {
    const currentTime = Number(
      sessionStorage.getItem('forgotPasswordSuccessTime'),
    );
    if (currentTime <= 0) {
      const targetTimer = Date.now() + 60 * 1000;
      sessionStorage.setItem('forgotPasswordSuccessTime', `${targetTimer}`);
      setTimer(60);
    }
  };

  const resetTimer = () => {
    const currentTime = getCurrentTime();
    if (currentTime > 0) {
      return;
    }
    sessionStorage.removeItem('forgotPasswordSuccessTime');
    setTimer(0);
    initTimer();
  };

  useEffect(() => {
    if (!Number(sessionStorage.getItem('forgotPasswordSuccessTime'))) {
      initTimer();
    }
  }, []);

  const isRerendered = timer > 0;

  useEffect(() => {
    if (Number(sessionStorage.getItem('forgotPasswordSuccessTime'))) {
      const interval = setInterval(() => {
        const remainingTime = getCurrentTime();
        if (remainingTime < 0) {
          clearInterval(interval);
        }
        setTimer(remainingTime);
      }, 1000);
    }
  }, [isRerendered]);
  const { toast } = useToast();

  const onResendForgotPasswordHandler = async (email: string) => {
    if (!email) {
      toast({
        title: 'Email not found',
        description: 'Email not found, please try again',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }
    try {
      setIsForgotPasswordSent(true);
      await sendForgotPasswordLink(email);
      resetTimer();
      toast({
        title: 'Success',
        description: 'Forgot password link has been sent to your email',
        variant: 'default',
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: (err as Error).message || 'Something error occured',
        variant: 'destructive',
        duration: 2000,
      });
      setTimer(0);
    } finally {
      setIsForgotPasswordSent(false);
    }
  };

  const isResendDisabled = isForgotPasswordSent || timer > 0;

  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-secondary via-white to-secondary'>
      {isLaptop ? (
        <Navigation navItems={navItems} />
      ) : (
        <header className='sticky top-0 z-10 flex items-center justify-between bg-white/70 px-6 py-4 backdrop-blur-sm transition-colors duration-300'>
          <button
            onClick={() => navigate(-1)}
            type='button'
            aria-label='Kembali'
            className='rounded-full p-1 shadow-sm shadow-gray-400'
          >
            <ChevronLeft className='size-8 font-bold' />
          </button>
          <span className='text-lg font-semibold tracking-wider text-primary'>
            HantaranByJoo
          </span>
          <button
            onClick={() => navigate('/profile')}
            type='button'
            aria-label='Profil'
            className='rounded-full bg-[#6C363F] p-2 text-white'
          >
            <UserRound className='size-4' />
          </button>
        </header>
      )}

      {/* Konten dipusatkan secara vertikal dan horizontal */}
      <main className='flex flex-1 flex-col items-center justify-center gap-4 px-4 py-6'>
        {/* Kartu utama */}
        <section className='flex w-full max-w-2xl flex-col items-center gap-3 rounded-lg bg-white p-5 shadow-md md:gap-4 md:p-8'>
          <div className='flex size-10 items-center justify-center rounded-full bg-prime p-2 text-white md:size-14'>
            <MailCheck className='md:size-7' />
          </div>

          <div className='inline-flex items-center gap-1.5 rounded-full bg-tertiary px-3 py-1 font-semibold text-primary'>
            <span className='size-2 rounded-full bg-primary' />
            <h1 className='text-[0.75rem] tracking-wide md:text-sm'>
              Tautan berhasil dikirim
            </h1>
          </div>

          <p className='text-center text-xs md:text-sm'>
            Kami telah mengirimkan tautan pemulihan kata sandi ke alamat email
            anda:
          </p>

          {/* Satu elemen teks + ikon: sejajar dan tidak meluber untuk email panjang */}
          <div className='flex max-w-full items-center gap-2 rounded-full bg-gray-200 px-4 py-1.5'>
            <Mail className='size-3.5 shrink-0 md:size-4' />
            <span className='truncate text-[0.75rem] font-bold tracking-wide md:text-sm'>
              {email}
            </span>
          </div>

          {/* Seluruh area tombol bisa diklik, bukan hanya teksnya */}
          <a
            href='https://mail.google.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex w-full items-center justify-center rounded-full bg-prime py-2.5 text-xs font-bold tracking-widest text-white transition-opacity hover:opacity-90 md:w-3/4 md:text-sm'
          >
            Buka Aplikasi Gmail
          </a>

          {/* Lebar disamakan dengan tombol Gmail */}
          <div className='flex w-full flex-col items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 md:w-3/4'>
            <p className='text-center text-[0.7rem] md:text-sm'>
              Belum menerima email dari{' '}
              <span className='font-semibold text-prime'>HantaranByJoo?</span>
            </p>
            <button
              type='button'
              className={`flex items-center justify-center gap-1.5 rounded-full px-2 py-2 tracking-wider text-white md:px-5 md:py-2.5 sm:gap-2.5 ${
                isResendDisabled ? 'bg-gray-400' : 'bg-prime'
              }`}
              disabled={isResendDisabled}
              onClick={() => onResendForgotPasswordHandler(email)}
            >
              {isForgotPasswordSent ? (
                <>
                  <Loader2 className='size-4 animate-spin md:size-5' />
                  <span className='text-[0.7rem] md:text-sm'>
                    Mengirim Tautan...
                  </span>
                </>
              ) : (
                <>
                  <Clock className='size-4 md:size-5' />
                  <span className='text-[0.7rem] md:text-sm'>
                    {timer > 0
                      ? `Tautan terkirim (${formatTimer(timer)})`
                      : 'Kirim Ulang Tautan Pemulihan'}
                  </span>
                </>
              )}
            </button>
            <p className='text-center text-[0.7rem] md:text-sm'>
              Periksa juga folder spam atau promosi
            </p>
          </div>

          <Link
            to='/login'
            className='flex items-center gap-1 text-xs font-semibold text-prime md:text-sm'
          >
            <ArrowLeft className='size-4' />
            <span className='border-b border-prime'>
              Kembali ke halaman masuk
            </span>
          </Link>
        </section>

        {/* Bar bantuan: lebar sama dengan kartu di atas (max-w-2xl) */}
        <a
          href='https://wa.me/6282121087879'
          target='_blank'
          rel='noopener noreferrer'
          className='flex w-full max-w-2xl items-center justify-between gap-3 rounded-full bg-white px-4 py-2 shadow-md md:bg-prime md:text-white'
        >
          <div className='flex items-center gap-3'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-tertiary p-2 text-prime'>
              <img
                src={csImage}
                alt='Customer Service'
                className='size-full object-contain'
              />
            </div>
            <div>
              <p className='text-sm font-semibold'>Butuh Bantuan?</p>
              <p className='text-xs'>Tim kami siap membantu kamu</p>
            </div>
          </div>

          <div className='flex size-9 shrink-0 items-center justify-center rounded-full bg-prime text-white md:bg-white/20'>
            <MessageCircle className='size-5' />
          </div>
        </a>
      </main>
    </div>
  );
};

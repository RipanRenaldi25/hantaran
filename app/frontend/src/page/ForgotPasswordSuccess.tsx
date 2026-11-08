import { INavItems, Navigation } from '@/components/Navigation';
import {
  ArrowLeft,
  ChevronLeft,
  Clock,
  MailCheck,
  MessageCircle,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import csImage from '@/assets/cs.png';
import { useEffect, useState } from 'react';
import { formatTimer } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

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

export const ForgotPasswordSuccess = () => {
  const navigate = useNavigate();
  const isLaptop = window.innerWidth > 860;
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
    useState<boolean>(true);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
    }
  };

  return (
    <div className='space-y-4 bg-gradient-to-b from-secondary via-white to-secondary relative md:bg-blue-500 min-h-screen'>
      {isLaptop ? (
        <Navigation navItems={navItems} />
      ) : (
        <header
          className={`py-4 px-6 flex items-center justify-between bg-white/70 sticky top-0 backdrop:blur-sm z-10 transition-colors duration-300 `}
        >
          <button
            onClick={() => navigate(-1)}
            type='button'
            className='shadow-sm shadow-gray-400 p-1 rounded-full'
          >
            <ChevronLeft className='size-8 font-bold' />
          </button>
          <h1 className='text-primary font-semibold tracking-wider text-lg'>
            HantaranByJoo
          </h1>
          <button
            onClick={() => navigate('/profile')}
            className='rounded-full bg-[#6C363F] text-white p-2'
          >
            <UserRound className='size-4' />
          </button>
        </header>
      )}

      <section className='container px-4 flex flex-col items-center gap-3 bg-white w-[90%] py-4 rounded-lg shadow-md'>
        <div className='bg-prime mx-auto size-10 rounded-full flex items-center justify-center p-2 text-white'>
          <MailCheck />
        </div>
        <div className='inline-flex mx-auto items-center gap-1 bg-tertiary rounded-full px-2 py-1 text-primary font-semibold'>
          <div className='size-2 bg-primary rounded-full'></div>
          <h1 className='text-[0.75rem] tracking-wide '>
            Tautan berhasil dikirim
          </h1>
        </div>
        <p className='text-xs text-center'>
          Kami telah mengirimkan tautan pemulihan kata sandi ke alamat email
          anda:
        </p>
        <div className='inline-flex mx-auto items-center gap-1 bg-gray-200  rounded-full px-4 py-1 font-semibold'>
          <h1 className='text-[0.75rem] tracking-wide  shrink-0 '>@</h1>
          <h1 className='text-[0.75rem] font-bold tracking-wide  shrink-0 '>
            {email}
          </h1>
        </div>

        <div className='flex items-center justify-center bg-prime w-full py-2 rounded-full text-white'>
          <a
            href='https://mail.google.com'
            target='_blank'
            className='text-xs tracking-widest font-bold'
          >
            Buka Aplikasi Gmail
          </a>
        </div>

        <div className='flex flex-col items-center justify-center bg-primary/10 py-2 px-4 rounded-lg gap-1'>
          <p className='text-[0.7rem]'>
            Belum menerima email dari{' '}
            <span className='text-prime font-semibold'>HantaranByJoo?</span>
          </p>
          <button
            className={`flex items-center gap-1 px-2 py-2 rounded-full text-white tracking-wider ${timer > 0 ? 'bg-gray-400' : 'bg-prime '}`}
            disabled={timer > 0}
            onClick={() => onResendForgotPasswordHandler(email)}
          >
            <Clock className='size-3' />
            <p className='text-[0.7rem] font-semibold'>
              {timer > 0
                ? `Tautan Baru Terkirim ${formatTimer(timer)}`
                : 'Kirim Ulang Tautan Pemulihan'}
            </p>
          </button>
          <p className='text-[0.7rem]'>Periksa juga folder spam atau promosi</p>
        </div>

        <Link
          to={'/login'}
          className=' flex text-prime font-semibold items-center gap-1 text-xs'
        >
          <ArrowLeft className='size-4' />
          <p className='border-b border-prime '>Kembali ke halaman masuk</p>
        </Link>
      </section>

      <section className='w-[90%] mx-auto bg-white rounded-full'>
        <a
          className='flex justify-between md:bg-prime md:w-full md:text-white px-4 py-2 rounded-full '
          href='https://wa.me/6282121087879'
          target='_blank'
        >
          <div className='flex items-center gap-2 '>
            <div className='bg-tertiary text-prime p-2 rounded-full'>
              <img src={csImage} alt='Customer Service' />
            </div>
            <div>
              <h1 className='font-semibold text-sm'>Butuh Bantuan?</h1>
              <p className='text-xs'>Tim kami siap membantu kamu</p>
            </div>
          </div>
          <div className='p-2 text-white rounded-full bg-prime text-primary flex items-center justify-center'>
            <MessageCircle className='size-5' />
          </div>
        </a>
      </section>
    </div>
  );
};

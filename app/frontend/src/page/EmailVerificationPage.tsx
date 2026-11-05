import Stepper from '@/components/Stepper';
import { useToast } from '@/components/ui/use-toast';
import { VerifyEmail } from '@/components/VerifyEmail';
import { resendEmailVerification } from '@/feature/user';
import {
  ChevronLeft,
  Clock,
  Info,
  MailWarning,
  MessageSquareMore,
  RefreshCcw,
  ShieldAlert,
  UserRound,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const progress = Number(searchParams.get('progress')) || 0;
  const email = searchParams.get('email') || '';

  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getRemainingTime = () => {
    const expirationTime =
      Number(sessionStorage.getItem('expirationTime')) ?? 0;
    console.log({ expirationTime });
    if (!expirationTime) return 0;
    const currentTime = +new Date();
    const remainingTime = Math.floor((expirationTime - currentTime) / 1000);
    if (remainingTime <= 0) {
      return 0;
    }
    return remainingTime;
  };

  const resetTimer = () => {
    sessionStorage.setItem('expirationTime', '0');
    setRemaining(0);
  };

  const [remaining, setRemaining] = useState(() => getRemainingTime());
  const isDisabled = remaining > 0;
  function initTimer() {
    sessionStorage.setItem(
      'expirationTime',
      (+new Date() + 60 * 1000).toString(),
    );
    setRemaining(60);
  }

  useEffect(() => {
    if (!sessionStorage.getItem('expirationTime')) {
      initTimer();
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = getRemainingTime();
      setRemaining(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining > 0]);

  const [isResending, setIsResending] = useState(false);

  const resendHandler = async () => {
    setIsResending(true);
    try {
      await resendEmailVerification(email);
      const remainingTime = getRemainingTime();
      if (remainingTime > 0) {
        return;
      }
      initTimer();
      toast({
        title: 'Verification sent',
        description: "We've sent a new verification email to your inbox.",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: 'Resend Email Failed',
        description:
          'Failed to resend verification email, please try again later.',
        variant: 'destructive',
        duration: 2000,
      });
      resetTimer();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <article className='bg-gradient-to-b from-secondary via-white to-secondary  min-h-screen relative'>
      <header
        className={`py-4 px-6 flex items-center justify-between bg-white/70 sticky top-0 backdrop:blur-sm z-10 ${scrolled && 'bg-white/95'} transition-colors duration-300 `}
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

      <div className='md:max-w-screen-sm lg:max-w-screen-lg space-y-4 mx-auto mt-4'>
        <VerifyEmail email={email} />

        <section className='mt-4 flex items-center justify-center'>
          <div className='w-[90%] rounded-2xl bg-white p-4 border '>
            <div className='flex justify-between items-center'>
              <h1 className='text-[0.7rem] text-primary/80 tracking-wide font-semibold'>
                MENUNGGU KONFIRMASI
              </h1>
              <div className='flex items-center justify-center gap-1 text-sm text-second'>
                <ShieldAlert className='size-4' />
                <h1 className='font-semibold'>Enkripsi 256-bit</h1>
              </div>
            </div>
            <p className='text-center text-sm mt-4'>
              Kami telah mengirimkan tautan verifikasi akun ke email Anda.
              Silakan klik tombol di bawah untuk membuka Gmail atau aplikasi
              email Anda dan konfirmasi akun dalam <strong>24 jam.</strong>
            </p>
            <a
              href='https://mail.google.com'
              target='_blank'
              className='bg-prime w-full text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-[0.75rem] mt-5 tracking-widest'
            >
              <MailWarning />
              <span>BUKA GMAIL & VERIFIKASI</span>
            </a>
          </div>
        </section>

        <section className='bg-primary/5 w-[90%] mx-auto rounded-2xl border px-4 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Belum Menerima Email?</h1>
            <div className='flex gap-2 bg-gray-200 rounded-full py-1 px-3 items-center justify-center text-sm '>
              <Clock className='size-4' />
              <span>
                {remaining >= 60
                  ? `0${Math.floor(remaining / 60)}:${remaining - 60}`
                  : `00:${remaining}`}
              </span>
            </div>
          </div>

          <p className='text-[0.7rem] text-black/70 mt-2'>
            Periksa folder Spam atau Promosi, atau kirim ulang tautan setelah
            penghitung waktu berakhir.
          </p>
          <div className='border-t-2 mt-2'>
            <button
              className={`w-full bg-prime text-white flex items-center justify-center gap-2 py-2 rounded-full ${(isDisabled || isResending) && 'opacity-70 cursor-not-allowed transition-colors duration-300 ease-linear'}`}
              type='button'
              disabled={isDisabled || isResending}
              onClick={resendHandler}
            >
              <RefreshCcw className={`${isDisabled && 'animate-spin-slow'}`} />
              <h1 className='text-sm tracking-widest'>
                {isResending ? 'Sedang mengirim ulang' : 'Kirim Ulang Tautan'}
              </h1>
            </button>
          </div>
        </section>

        <section className='rounded-2xl w-[90%] mx-auto border bg-white px-4 py-2'>
          <div className='flex gap-3 justify-between items-center'>
            <div className='flex gap-2 md:gap-3 items-center'>
              <div className='p-2 rounded-full bg-primary'>
                <Info className='bg-primary text-white size-4' />
              </div>
              <div>
                <h1 className='font-semibold text-md'>Butuh bantuan?</h1>
                <p className='text-sm tracking-wide'>
                  Hubungi tim kami (09.00 - 21.00 WIB)
                </p>
              </div>
            </div>
            <div className='p-2 bg-prime text-white rounded-full flex items-center justify-center'>
              <a href='https://wa.me/6282121087879' target='_blank'>
                <MessageSquareMore className='size-4' />
              </a>
            </div>
          </div>
        </section>

        <section>
          <Stepper current={progress} />
        </section>
      </div>
    </article>
  );
}

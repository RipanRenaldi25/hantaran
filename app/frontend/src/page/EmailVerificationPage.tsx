import { CustomerService } from '@/components/CustomerService';
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
    <article className='py-4 rounded-3xl  min-h-screen relative '>
      <div className='md:max-w-screen-sm lg:max-w-screen-lg space-y-4 mx-auto mt-4'>
        <VerifyEmail email={email} />

        <section className='mt-4 flex items-center justify-center'>
          <div className='w-[90%] rounded-2xl bg-white p-4 border '>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-0.5 bg-yellow-500/20 rounded-full py-1 px-2'>
                <div className='size-2 rounded-full shrink-0 bg-orange-500'></div>
                <h1 className='text-[0.65rem] text-prime tracking-wide font-semibold shrink-0'>
                  MENUNGGU KONFIRMASI
                </h1>
              </div>
              <div className='flex items-center justify-center gap-0.5 text-sm text-second'>
                <ShieldAlert className='size-3 text-neutral opacity-50' />
                <h1 className='font-semibold text-xs text-neutral opacity-50'>
                  Enkripsi 256-bit
                </h1>
              </div>
            </div>
            <p className='text-center text-xs mt-4'>
              Kami telah mengirimkan tautan verifikasi akun ke email Anda. Klik
              tombol di bawah untuk membuka Gmail untuk konfirmasi akun dalam{' '}
              <strong>24 jam.</strong>
            </p>
            <a
              href='https://mail.google.com'
              target='_blank'
              className='bg-prime w-full text-white py-2 px-3 rounded-full flex items-center justify-center gap-2 text-[0.75rem] mt-5 tracking-widest'
            >
              <MailWarning className='size-4' />
              <span className='tracking-wider'>BUKA GMAIL</span>
            </a>
          </div>
        </section>

        <section className='bg-white w-[90%] mx-auto rounded-2xl border px-4 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-prime'>Belum Menerima Email?</h1>
            <div className='flex gap-2 bg-black bg-opacity-5 rounded-full py-1 px-3 items-center justify-center text-sm '>
              <Clock className='size-3' />
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
          <div className='mt-2'>
            <button
              className={`w-full bg-primary  text-white flex items-center justify-center gap-2 py-2 rounded-full ${(isDisabled || isResending) && 'opacity-70 cursor-not-allowed transition-colors duration-300 ease-linear'}`}
              type='button'
              disabled={isDisabled || isResending}
              onClick={resendHandler}
            >
              <RefreshCcw
                className={`${isDisabled && 'animate-spin-slow'} size-4`}
              />
              <h1 className='text-xs tracking-widest'>
                {isResending ? 'Sedang mengirim ulang' : 'Kirim Ulang Tautan'}
              </h1>
            </button>
          </div>
        </section>
        <div className='w-[90%] mx-auto'>
          <CustomerService />
        </div>

        <section>
          <Stepper current={progress} />
        </section>
      </div>
    </article>
  );
}

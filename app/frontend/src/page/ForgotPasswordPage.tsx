import csImage from '@/assets/cs.png';
import InputField from '@/components/InputField';
import { INavItems, Navigation } from '@/components/Navigation';
import { useToast } from '@/components/ui/use-toast';
import { sendForgotPasswordLink } from '@/feature/user';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  LoaderCircle,
  Lock,
  Mail,
  MessageCircle,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const onEmailChangeHandler = (
    _key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Field is empty',
        description: 'Please fill in your email address.',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendForgotPasswordLink(email);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
      navigate(`/forgot-password/success?email=${email}`);
    } catch (err) {
      console.log({ err });
      toast({
        title: 'Error',
        description: (err as Error).message || 'Something error occured',
        variant: 'destructive',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className='mx-auto space-y-4 md:bg-white  md:rounded-2xl md:flex md:flex-col md:items-center md:justify-center md:py-6 md:px-8 '>
      <section className=''>
        <h1 className='text-2xl text-primary font-[400] text-center tracking-wide'>
          Lupa Kata Sandi?
        </h1>
        <p className='text-center text-sm text-prime leading-relaxed mt-2'>
          Masukkan email terdaftar anda. Kami akan mengirimkan tautan untuk
          mengatur ulang kata sandi anda.
        </p>
      </section>

      <section className='rounded-xl px-4 py-6 md:px-0 md:py-0 border md:border-none  bg-white/70'>
        <form onSubmit={onSubmitHandler}>
          <InputField
            title='Email Terdaftar'
            name='email'
            type='email'
            Icon={Mail}
            placeholder='nama@domain.com'
            subtitle={
              <div className='flex items-center gap-1 '>
                <Lock className='size-3.5' />
                <p className='text-xs'>Enkripsi</p>
              </div>
            }
            onInputChangeHandler={onEmailChangeHandler}
            value={email}
          />
          <p className='text-xs mt-3 text-prime lg:text-sm'>
            Petunjuk reset kata sandi akan dikirim ke email tersebut. Mohon cek
            email secara berkala
          </p>

          <button
            type='submit'
            className={`bg-prime flex text-white py-2 px-4 rounded-full items-center w-full justify-center hover:bg-primary/90 text-sm gap-1 mt-6 ${isLoading && 'bg-prime'} transition-colors duration-300`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className='flex items-center gap-2'>
                <LoaderCircle className='animate-spin-slow size-4' />
                <h1>Sedang mengirim tautan</h1>
              </div>
            ) : (
              <h1 className='flex items-center gap-2 lg:text-base'>
                Kirim Tautan Pemulihan
                <span>
                  <ArrowRight className='size-4' />
                </span>
              </h1>
            )}
          </button>
        </form>
        <section className='flex items-center justify-center text-xs gap-1 mt-3'>
          <ArrowLeft className='size-4' />
          <div className='flex items-center gap-1 lg:text-sm'>
            <p>Ingat kata sandi anda?</p>
            <Link
              to='/login'
              className='border-b border-primary text-prime font-semibold'
            >
              {' '}
              Masuk ke akun
            </Link>
          </div>
        </section>
      </section>

      <a
        className='flex justify-between  bg-white md:bg-prime md:w-full md:text-white px-4 py-2 rounded-full'
        href='https://wa.me/6282121087879'
        target='_blank'
      >
        <div className='flex items-center gap-2'>
          <div className='bg-tertiary text-prime p-2 rounded-full'>
            <img src={csImage} alt='Customer Service' />
          </div>
          <div>
            <h1 className='font-semibold text-sm'>Butuh Bantuan?</h1>
            <p className='text-xs'>Tim kami siap membantu kamu</p>
          </div>
        </div>
        <div className='p-2 rounded-full bg-white text-primary'>
          <MessageCircle />
        </div>
      </a>
    </div>
  );
};

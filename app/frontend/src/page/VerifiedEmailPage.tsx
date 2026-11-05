import Stepper from '@/components/Stepper';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  UserRound,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const VerifiedEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const progress = Number(searchParams.get('progress')) || 2;
  return (
    <article className='bg-gradient-to-b from-secondary via-white to-secondary  relative h-screen '>
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
      <div className='md:max-w-sm mx-auto my-auto'>
        <section className='mt-4 p-4'>
          <Stepper current={progress} />
        </section>

        <section className='rounded-xl px-8 py-6 border w-[90%] mx-auto flex flex-col lg:space-y-6'>
          <div className='size-28 border mx-auto rounded-full my-auto flex items-center justify-center bg-primary/5'>
            <div className='size-24 rounded-full border flex items-center justify-center bg-primary/10'>
              <div className='mx-auto rounded-full size-20 border flex items-center justify-center text-center bg-prime text-white relative shadow-[0_0_50px_0px] shadow-prime'>
                <Check className='size-8' />
              </div>
            </div>
          </div>

          <div className='rounded-full border mt-4  items-center  inline-flex mx-auto gap-2 px-4 py-1 '>
            <span className='size-3 rounded-full bg-prime inline-flex'></span>
            <h1 className='text-primary font-semibold'>Verifikasi Berhasil</h1>
          </div>

          <p className='text-xs tracking-wide leading-5 text-center mt-4 text-black/70'>
            Email anda telah berhasil diverifikasi. Akun anda kini siap
            digunakan untuk membuka katalog
          </p>

          <button
            type='button'
            className='flex items-center justify-center mt-4 rounded-full border py-3 bg-prime text-white text-sm tracking-wider gap-1'
            onClick={() => navigate('/login')}
          >
            Masuk ke akun
            <span>
              <ArrowRight className='size-4' />
            </span>
          </button>
        </section>
      </div>
    </article>
  );
};

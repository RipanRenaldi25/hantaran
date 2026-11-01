import { VerifyEmail } from '@/components/VerifyEmail';
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
import { useNavigate } from 'react-router-dom';

export default function EmailVerificationPage() {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  console.log({ scrolled });
  return (
    <article className='bg-gradient-to-b from-secondary via-white to-secondary  min-h-screen space-y-4 relative '>
      <header
        className={`py-4 px-6 flex items-center justify-between bg-white/70 sticky top-0 backdrop:blur-sm z-10 ${scrolled && 'bg-white/95'} transition-colors duration-300`}
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

      <VerifyEmail email='test@gmail.com' />

      <section className='flex items-center justify-center'>
        <div className='w-[90%] rounded-2xl bg-white p-4 shadow-lg'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[0.7rem] text-primary/80'>
              TAUTAN AKTIVASI AKUN
            </h1>
            <div className='flex items-center justify-center gap-1 text-sm text-second'>
              <ShieldAlert className='size-4' />
              <h1>Enkripsi 256-bit</h1>
            </div>
          </div>
          <p className='text-center text-sm mt-4'>
            Kami telah mengirimkan tautan verifikasi akun ke email Anda. Silakan
            klik tombol di bawah untuk membuka Gmail atau aplikasi email Anda
            dan konfirmasi akun dalam <strong>24 jam.</strong>
          </p>
          <button
            type='button'
            className='bg-prime w-full text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-[0.75rem] mt-5 tracking-widest'
          >
            <MailWarning />
            <span>BUKA GMAIL & VERIFIKASI</span>
          </button>
        </div>
      </section>

      <section className='bg-primary/5 w-[90%] mx-auto rounded-2xl shadow-sm px-4 py-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold'>Belum Menerima Email?</h1>
          <div className='flex gap-2 bg-gray-200 rounded-full py-1 px-3 items-center justify-center text-sm '>
            <Clock className='size-4' />
            <span>00:45</span>
          </div>
        </div>

        <p className='text-[0.7rem] text-black/70 mt-2'>
          Periksa folder Spam atau Promosi, atau kirim ulang tautan setelah
          penghitung waktu berakhir.
        </p>
        <div className='border-t-2 mt-2'>
          <button className='w-full bg-prime text-white flex items-center justify-center gap-2 py-2 rounded-full'>
            <RefreshCcw />
            <h1 className='text-sm tracking-widest'>
              Kirim Ulang Tautan Verifikasi
            </h1>
          </button>
        </div>
      </section>

      <section className='rounded-2xl w-[90%] mx-auto bg-white px-4 py-2'>
        <div className='flex gap-3 justify-between items-center'>
          <div className='p-2 rounded-full bg-primary'>
            <Info className='bg-primary text-white size-4' />
          </div>
          <div>
            <h1 className='font-semibold text-md'>Butuh bantuan verifikasi?</h1>
            <p className='text-sm tracking-wide'>
              Hubungi tim kami (09.00 - 21.00 WIB)
            </p>
          </div>
          <div className='p-2 bg-prime text-white rounded-full flex items-center justify-center'>
            <MessageSquareMore className='size-4' />
          </div>
        </div>
      </section>
    </article>
  );
}

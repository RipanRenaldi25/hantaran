import csImage from '@/assets/cs.png';
import { MessageCircle } from 'lucide-react';

export const CustomerService = () => {
  return (
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
  );
};

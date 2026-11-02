import { Check } from 'lucide-react';

interface IPasswordHintProps {
  title: string;
  isValid: boolean;
}

export const PasswordHint = ({ title, isValid }: IPasswordHintProps) => {
  return (
    <div className={`flex justify-between items-center text-slate-400`}>
      <div
        className={`flex items-center gap-2 ${!isValid ? 'opacity-60' : 'opacity-100 font-semibold'} transition-all duration-300`}
      >
        <div className='size-[0.4rem] md:size-2.5 rounded-full bg-primary shrink-0'></div>
        <span
          className={`flex items-center text-[0.7rem] md:text-sm text-primary`}
        >
          {title}
        </span>
      </div>

      <span>
        <Check className={`size-4 ${isValid && 'text-green-600'} md:size-5`} />
      </span>
    </div>
  );
};

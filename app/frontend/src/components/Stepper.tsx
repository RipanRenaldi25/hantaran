import { Check, Lock, UserRound, MailCheck } from 'lucide-react';

const defaultSteps = [
  { label: 'Registrasi Akun', icon: UserRound },
  { label: 'Verifikasi Email', icon: MailCheck },
  { label: 'Katalog Private', icon: Lock },
];

type Status = 'done' | 'active' | 'upcoming';

interface IStepperProps {
  current: number;
  steps?: {
    label: string;
    icon: React.ComponentType | null;
  }[];
}

const getCurrentStatus = (index: number, current: number): Status => {
  if (index < current) return 'done';
  if (index === current) return 'active';
  return 'upcoming';
};

const Stepper = ({ current, steps = defaultSteps }: IStepperProps) => {
  return (
    <ol className='w-[100%] mx-auto flex'>
      {steps.map((step, index) => {
        const status = getCurrentStatus(index, current);
        const isLast = index === steps.length - 1;
        console.log({ status });

        return (
          <li
            key={step.label}
            className='relative flex flex-col items-center flex-1'
          >
            {!isLast && (
              <div
                className={`h-1  w-full absolute left-1/2 top-[12px] transition-colors duration-300 ${status === 'done' ? 'bg-prime' : 'bg-gray-200'}`}
              ></div>
            )}
            <div
              className={`size-7 lg:size-10 bg-prime ${status === 'active' && 'bg-white'} rounded-full z-10 flex items-center justify-center`}
            >
              {status === 'done' && (
                <Check className='text-white size-5 lg:size-6' />
              )}
              {status === 'active' && (
                <div className='size-3 lg:size-5 bg-prime animate-pulse duration-1500 rounded-full'></div>
              )}
              {status === 'upcoming' && step.icon && (
                <span className='text-white size-4 lg:size-5 flex items-center justify-center'>
                  <step.icon />
                </span>
              )}
            </div>
            <p className='text-center text-prime font-semibold tracking-wide text-[0.75rem] mt-1'>
              {index + 1}. {step.label}
            </p>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;

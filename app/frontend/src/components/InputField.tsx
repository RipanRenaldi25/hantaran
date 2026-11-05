import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface IInputField {
  title: string;
  onInputChangeHandler: (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  type: string;
  placeholder: string;
  name: string;
  children?: React.ReactNode;
  value: string;
  required?: boolean;
  autoComplete?: string;
  Icon?: React.ComponentType | null;
  subtitle?: string | null | React.ReactNode;
}

const InputField = ({
  title,
  onInputChangeHandler,
  type,
  placeholder,
  name,
  children,
  value = '',
  required = false,
  autoComplete,
  Icon,
  subtitle,
}: IInputField) => {
  const inputId = `input-${name}`;

  return (
    <div className='flex flex-col gap-1.5 w-full'>
      <div className='flex items-center justify-between'>
        <Label
          htmlFor={inputId}
          className='text-xs font-semibold text-foreground md:text-base'
        >
          {title} {required && <span className='text-destructive'>*</span>}
        </Label>
        {subtitle && (
          <p className='text-[0.7rem] text-prime opacity-80 tracking-widest'>
            {subtitle}
          </p>
        )}
      </div>
      <div className='relative flex items-center'>
        {Icon && (
          <span className='absolute left-3 text-muted-foreground pointer-events-none z-10'>
            <Icon />
          </span>
        )}
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={(e) => onInputChangeHandler(e.target.name, e)}
          value={value}
          required={required}
          autoComplete={autoComplete}
          className={`min-h-[44px] rounded-xl border-border bg-white text-foreground focus-visible:ring-primary focus-visible:border-primary transition-all text-sm ${
            Icon ? 'pl-9 pr-3.5' : 'px-3.5'
          } relative`}
        />
        {children}
      </div>
    </div>
  );
};

export default InputField;

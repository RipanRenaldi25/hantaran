import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface IInputField {
  title: string;
  onInputChangeHandler: (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type: string;
  placeholder: string;
  name: string;
  children?: React.ReactNode;
  value: string;
  required?: boolean;
  autoComplete?: string;
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
}: IInputField) => {
  const inputId = `input-${name}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label htmlFor={inputId} className="text-xs font-semibold text-foreground">
        {title} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onInputChangeHandler(e.target.name, e)}
        value={value}
        required={required}
        autoComplete={autoComplete}
        className="min-h-[44px] rounded-xl border-border bg-white text-foreground focus-visible:ring-primary focus-visible:border-primary transition-all text-sm px-3.5"
      />
      {children}
    </div>
  );
};

export default InputField;

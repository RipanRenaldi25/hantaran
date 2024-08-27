import React from 'react';
import { Input } from './ui/input';

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
}

const InputField = ({
  title,
  onInputChangeHandler,
  type,
  placeholder,
  name,
  children,
}: IInputField) => {
  return (
    <div className="flex flex-col gap-2 ">
      <label>{title}</label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onInputChangeHandler(e.target.name, e)}
      />
      {children}
    </div>
  );
};

export default InputField;

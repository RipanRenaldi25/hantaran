import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../components/ui/button';
import { NavLink } from 'react-router-dom';
import { Check, Eye } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import InputField from '../components/InputField';

const Register = () => {
  const { toast } = useToast();
  const [registerField, setRegisterField] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: '', email: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

  const validatePassword = (password: string) => {
    let isValid = true;

    if (password.length < 8) {
      isValid = false;
    }
    if (
      !/(?=.*[0-9])/.test(password) ||
      !/(?=.*[!@#$%^&*])/.test(password) ||
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password)
    ) {
      isValid = false;
    }

    setIsPasswordValid(isValid);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      toast({
        title: 'Password Error',
        description: 'Please make sure your password is correct',
        variant: 'destructive',
      });
    }
  };

  const onInputChangeHandler = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterField((prevValue) => ({ ...prevValue, [key]: e.target.value }));
  };
  return (
    <div>
      <form
        className="flex justify-center h-screen items-center flex-col shadow-md"
        onSubmit={handleRegister}
      >
        <article className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 shadow-lg w-1/3 py-12 px-8">
          <h1 className="text-center font-bold text-2xl">Create an account</h1>
          <p>Enter your information below to create your account</p>
          <section className="flex flex-col gap-5">
            <InputField
              name="username"
              onInputChangeHandler={onInputChangeHandler}
              placeholder="John"
              title="Username"
              type="text"
            />
            <InputField
              onInputChangeHandler={onInputChangeHandler}
              placeholder="doe@gmail.com"
              title="Email"
              type="email"
              name="email"
            />
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <div className="relative">
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="*********"
                  onChange={(e) => {
                    onInputChangeHandler('password', e);
                    validatePassword(e.target.value);
                  }}
                />
                <span className="absolute top-1/2 right-0 -translate-y-1/2">
                  <Button
                    type="button"
                    className="bg-transparent text-black hover:text-white"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    <Eye />
                  </Button>
                </span>
              </div>
              <div className={`relative flex justify-between text-slate-400`}>
                <span
                  className={`before:rounded-full before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:h-2 before:w-2 ${
                    registerField.password.length < 8
                      ? 'before:bg-slate-400'
                      : 'before:bg-black text-black'
                  }`}
                >
                  Password need to be at least 8 characters
                </span>
                <Check
                  className={
                    registerField.password.length < 8
                      ? 'text-slate-400'
                      : 'text-green-600 font-bold'
                  }
                />
              </div>
              <div className={`relative flex justify-between text-slate-400`}>
                <span
                  className={`before:rounded-full before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:h-2 before:w-2 ${
                    !/(?=.*[0-9])/.test(registerField.password)
                      ? 'before:bg-slate-400'
                      : 'before:bg-black text-black'
                  }`}
                >
                  Password need to be at least has 1 number
                </span>
                <Check
                  className={
                    !/(?=.*[0-9])/.test(registerField.password)
                      ? 'text-slate-400'
                      : 'text-green-600 font-bold'
                  }
                />
              </div>
              <div className={`relative flex justify-between text-slate-400`}>
                <span
                  className={`before:rounded-full before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:h-2 before:w-2 ${
                    !/[!@#$%^&*]+/.test(registerField.password)
                      ? 'before:bg-slate-400'
                      : 'before:bg-black text-black'
                  }`}
                >
                  Password need to be at least has 1 symbol
                </span>
                <Check
                  className={
                    /[!@#$%^&*]+/.test(registerField.password)
                      ? 'text-green-600 font-bold'
                      : 'text-slate-400'
                  }
                />
              </div>
              <div className={`relative flex justify-between text-slate-400`}>
                <span
                  className={`before:rounded-full before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:h-2 before:w-2 ${
                    /(?=.*[A-Z])/.test(registerField.password)
                      ? 'before:bg-black text-black'
                      : 'before:bg-slate-400'
                  }`}
                >
                  Password at least has 1 capital letter
                </span>
                <Check
                  className={
                    !/(?=.*[A-Z])/.test(registerField.password)
                      ? 'text-slate-400'
                      : 'text-green-600 font-bold'
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <Button>Register</Button>
              <p>
                Already have an account?{' '}
                <NavLink to="/login" className="font-bold">
                  Login
                </NavLink>
              </p>
            </div>
          </section>
        </article>
      </form>
    </div>
  );
};

export default Register;

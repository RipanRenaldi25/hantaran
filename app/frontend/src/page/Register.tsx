import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../components/ui/button';
import { NavLink } from 'react-router-dom';
import { Check, CircleX, Eye, MailCheck } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import InputField from '../components/InputField';
import { register } from '@/feature/user';

const Register = () => {
  const { toast } = useToast();
  const [registerField, setRegisterField] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: '', email: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isEmailsend, setIsEmailSend] = useState<boolean>(false);

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !registerField.username ||
      !registerField.email ||
      !registerField.password
    ) {
      toast({
        title: 'Register Error',
        description: 'username, email, and password is required',
        variant: 'destructive',
      });
      return;
    }
    if (!isPasswordValid) {
      toast({
        title: 'Password Error',
        description: 'Please make sure your password is correct',
        variant: 'destructive',
      });
      return;
    }
    await register({ ...registerField });
    setIsEmailSend(true);
    setRegisterField(() => ({
      email: '',
      password: '',
      username: '',
    }));
  };

  const onInputChangeHandler = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterField((prevValue) => ({ ...prevValue, [key]: e.target.value }));
  };
  return (
    <article>
      {isEmailsend && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-10 hover:cursor-pointer"
            onClick={() => setIsEmailSend(false)}
          ></div>
          <section
            className={`bg-slate-800 w-1/4 h-80 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 rounded-lg flex items-center px-5 py-10 flex-col text-white justify-evenly ${
              isEmailsend ? 'scale-100' : 'scale-0'
            } transition-transform transform duration-300`}
          >
            <header className="text-center">
              <div>
                <MailCheck size={48} />
              </div>
              <Button
                className="absolute right-8 top-7 bg-transparent"
                onClick={() => setIsEmailSend(false)}
              >
                <CircleX size={28} />
              </Button>
            </header>
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-2xl">Please verify your email</h1>
              <p className="font-thin text-gray-200">
                If your email is valid, we just send an email verification to
                your email
              </p>
            </div>
            <footer className="flex gap-5 w-full justify-center">
              <div>
                <Button className="bg-white text-black w-40 hover:bg-black hover:text-white font-bold">
                  <NavLink to="https://www.gmail.com" target="_blank">
                    Check Email
                  </NavLink>
                </Button>
              </div>
              <div>
                <Button className="w-40 bg-transparent border hover:text-black font-bold">
                  <NavLink to="/login">Login</NavLink>
                </Button>
              </div>
            </footer>
          </section>
        </>
      )}
      <section>
        <form
          className="flex justify-center items-center flex-col relative"
          onSubmit={handleRegister}
        >
          {/* <article className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 shadow-lg w-1/3 py-12 px-8"> */}
          <article className="flex flex-col gap-5 shadow-lg border w-1/3 py-12 px-8 rounded-lg">
            <h1 className="text-center font-bold text-2xl">
              Create an account
            </h1>
            <p>Enter your information below to create your account</p>
            <section className="flex flex-col gap-5">
              <InputField
                name="username"
                onInputChangeHandler={onInputChangeHandler}
                placeholder="John"
                title="Username"
                type="text"
                value={registerField.username}
              />
              <InputField
                onInputChangeHandler={onInputChangeHandler}
                placeholder="doe@gmail.com"
                title="Email"
                type="email"
                name="email"
                value={registerField.email}
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
                    value={registerField.password}
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
      </section>
    </article>
  );
};

export default Register;

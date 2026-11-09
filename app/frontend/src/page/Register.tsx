import { ArrowRight, Eye, EyeOff, IdCard, Mail, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

import ButtonLoading from '@/components/ButtonLoading';
import { PasswordHint } from '@/components/PasswordHint';
import { useToast } from '@/components/ui/use-toast';
import { register } from '@/feature/user';
import InputField from '../components/InputField';

const Register = () => {
  const { toast } = useToast();
  const [registerField, setRegisterField] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: '', email: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const isValid =
      /[0-9]/.test(password) &&
      /!@#$%^&*()/.test(password) &&
      /[A-Z]/.test(password) &&
      password.length >= 8;
    const isContainNumber = /[0-9]/.test(password);
    const isContainSymbol = /[!@#$%^&*()]/.test(password);
    const isContainUppercase = /[A-Z]/.test(password);
    const isContainLowercase = /[a-z]/.test(password);
    console.log({
      isValid,
      isContainNumber,
      isContainSymbol,
      isContainUppercase,
      isContainLowercase,
    });
    return isValid;
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
        duration: 2000,
      });
      return;
    }
    if (validatePassword(registerField.password)) {
      toast({
        title: 'Password Error',
        description: 'Please make sure your password is correct',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      await register({ ...registerField });
      const email = registerField.email;
      setRegisterField(() => ({
        email: '',
        password: '',
        username: '',
      }));
      navigate(`/verify-email?progress=1&email=${email}`);
    } catch (err) {
      console.log({ err });
      toast({
        title: 'Register Error',
        description: `Failed to register, please try again: ${(err as Error).message}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChangeHandler = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRegisterField((prevValue) => ({ ...prevValue, [key]: e.target.value }));
  };
  return (
    <article>
      <section>
        <form
          className='flex justify-center items-center flex-col relative'
          onSubmit={handleRegister}
        >
          <article className='flex flex-col gap-1 md:gap-3 shadow-lg border w-[90%] md:w-2/3 py-12 px-8 rounded-lg lg:max-w-[500px] lg:rounded-3xl'>
            <Sparkles className='mx-auto text-prime' />
            <h1 className='text-center font-semibold text-2xl text-primary tracking-wide'>
              Create an account
            </h1>
            <p className='text-center text-xs md:text-base'>
              Enter your information below to begin crafting your ceremonial
              tray
            </p>
            <section className='flex flex-col gap-5 mt-4'>
              <InputField
                name='username'
                onInputChangeHandler={onInputChangeHandler}
                placeholder='John'
                title='Username'
                type='text'
                value={registerField.username}
              >
                <span className='absolute right-4 top-1/2 -translate-y-1/2'>
                  <IdCard className='size-5 opacity-50' />
                </span>
              </InputField>

              <InputField
                onInputChangeHandler={onInputChangeHandler}
                placeholder='doe@gmail.com'
                title='Email'
                type='email'
                name='email'
                value={registerField.email}
              >
                <span className='absolute right-4 top-1/2 -translate-y-1/2'>
                  <Mail className='size-5 opacity-50' />
                </span>
              </InputField>

              <InputField
                onInputChangeHandler={onInputChangeHandler}
                placeholder='********'
                title='Password'
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                value={registerField.password}
              >
                <button
                  type='button'
                  className='absolute right-4 top-1/2 -translate-y-1/2'
                  onClick={() => setIsShowPassword((prev) => !prev)}
                >
                  {isShowPassword ? (
                    <EyeOff className='size-5 opacity-80' />
                  ) : (
                    <Eye className='size-5 opacity-80' />
                  )}
                </button>
              </InputField>

              <div className='border py-3 px-4 space-y-1.5 rounded-lg border-secondary bg-secondary'>
                <PasswordHint
                  title='Password at least 8 characters'
                  isValid={registerField.password.length >= 8}
                />
                <PasswordHint
                  title='Password contain number'
                  isValid={/[0-9]/.test(registerField.password)}
                />
                <PasswordHint
                  title='Password contain symbol'
                  isValid={/[!@#$%^&*(),.?":{}|<>]/.test(
                    registerField.password,
                  )}
                />
                <PasswordHint
                  title='Password contain uppercase letter'
                  isValid={/[A-Z]/.test(registerField.password)}
                />
              </div>

              <div className='flex flex-col gap-2 '>
                <Button
                  className='flex gap-2 rounded-full bg-prime font-semibold '
                  disabled={isLoading}
                >
                  <span>
                    <ButtonLoading isLoading={isLoading} />
                  </span>
                  <span className='tracking-widest'>Register</span>
                  <span>
                    <ArrowRight className='size-4' />
                  </span>
                </Button>

                <div className='flex justify-center items-center mt-5'>
                  <p className='flex items-center justify-center gap-1'>
                    <span className='flex-1 text-sm'>
                      Already have an account?
                    </span>
                    <NavLink
                      to='/login'
                      className='font-bold text-prime border-b border-second hover:border-prime transition-colors duration-300'
                    >
                      Login
                    </NavLink>
                  </p>
                </div>
              </div>
            </section>
          </article>
        </form>
      </section>
    </article>
  );
};

export default Register;

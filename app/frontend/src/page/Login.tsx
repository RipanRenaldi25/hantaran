import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from '@/components/InputField';
import { getUserLogedin, login } from '@/feature/user';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/states';
import { asyncLoginUser, setUserLogedIn } from '@/states/UserLogedInState';
import { useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loginField, setLoginField] = useState<{
    uniqueIdentity: string;
    password: string;
  }>({ uniqueIdentity: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>();
  const userLogedIn = useSelector((states) => (states as any).userLogedIn);
  console.log({ userLogeddddIn: userLogedIn });

  useEffect(() => {
    if (!userLogedIn) {
      return;
    }
    if (userLogedIn.role === 'admin') {
      navigate('/dashboard');
    } else if (userLogedIn.role === 'user') {
      navigate('/user');
    }
  }, [userLogedIn.role]);

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!loginField.uniqueIdentity || !loginField.password) {
        toast({
          title: 'Login error',
          description: 'uniqueIdentity and password is required',
          variant: 'destructive',
        });
        return;
      }
      dispatch(asyncLoginUser(loginField));
    } catch (err) {
      toast({
        title: 'Login error',
        description: (err as { message: string }).message,
        variant: 'destructive',
      });
    }
  };

  const onInputChangeHandler = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoginField((prevValue) => ({ ...prevValue, [key]: e.target.value }));
  };
  return (
    <form
      className='bg-white flex flex-col shadow-lg py-12 px-6 border rounded-lg lg:rounded-3xl'
      onSubmit={handleLogin}
    >
      <div className='space-y-3'>
        <div className='text-center h-0.5 w-10 bg-tertiary mx-auto'></div>
      </div>
      <h1 className='text-center font-semibold text-xl lg:text-2xl text-primary'>
        Masuk ke Akun
      </h1>
      <p className='text-center text-[0.7rem] text-black/50 mt-2 mb-3 lg:text-base'>
        Masukkan username atau email dan kata sandi Anda untuk melanjutkan
      </p>
      <section className='flex flex-col gap-5'>
        <InputField
          type='text'
          name='uniqueIdentity'
          title='Username / Email'
          placeholder='Enter your username or email'
          onInputChangeHandler={onInputChangeHandler}
          value={loginField.uniqueIdentity}
        />
        <InputField
          type={isShowPassword ? 'text' : 'password'}
          name='password'
          title='Password'
          placeholder='Enter your password'
          onInputChangeHandler={onInputChangeHandler}
          value={loginField.password}
          subtitle={
            <button
              type='button'
              className='text-prime text-[0.65rem] lg:text-sm border-b border-primary font-semibold'
              onClick={() => navigate('/forgot-password')}
            >
              Lupa Sandi?
            </button>
          }
        >
          <span className='absolute top-1/2 right-0 -translate-y-1/2'>
            <Button
              type='button'
              className='bg-transparent text-black hover:text-white'
              onClick={() => setIsShowPassword((prev) => !prev)}
            >
              {isShowPassword ? (
                <EyeOff className='size-5' />
              ) : (
                <Eye className='size-5' />
              )}
            </Button>
          </span>
        </InputField>

        <Button
          type='submit'
          className='rounded-full bg-prime hover:bg-primary lg:text-lg tracking-widest'
        >
          Masuk
          <span>
            <ArrowRight className='size-4 ml-2 lg:size-5' />
          </span>
        </Button>
        <p className='text-xs text-center lg:text-base'>
          Belum Punya Akun?{' '}
          <NavLink to='/register' className='font-bold text-prime '>
            Daftar Sekarang
          </NavLink>
        </p>
      </section>
    </form>
  );
};

export default Login;

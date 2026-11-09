import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from '@/components/InputField';
import { getUserLogedin, login } from '@/feature/user';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/states';
import { setUserLogedIn } from '@/states/UserLogedInState';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [loginField, setLoginField] = useState<{
    uniqueIdentity: string;
    password: string;
  }>({ uniqueIdentity: '', password: '' });
  const [isShowPassword, setIsShowPassword] = useState<boolean>();

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
      const data = await login(loginField.uniqueIdentity, loginField.password);
      console.log({ isLoginSucceed: data });
      if (!data) {
        throw new Error('User is not login');
      }
      const user = await getUserLogedin();
      dispatch(setUserLogedIn(user));
      localStorage.setItem('ROLE', user.role);
      if (user.role === 'admin') {
        navigate('/dashboard', { state: user });
        return;
      } else {
        navigate('/user', { state: user });
      }
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
    <div className='flex flex-1 flex-col'>
      <form
        className='flex items-center flex-col relative m-auto w-full'
        onSubmit={handleLogin}
      >
        <article className='flex flex-col shadow-lg w-[90%] sm:w-[70%] lg:max-w-[500px] py-12 px-6 border rounded-lg lg:rounded-3xl'>
          <div className='space-y-3'>
            <div className='text-center h-0.5 w-10 bg-tertiary mx-auto'></div>
          </div>
          <h1 className='text-center font-bold text-2xl lg:text-3xl text-prime'>
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
                  className='text-prime text-[0.55rem] lg:text-sm border-b border-primary font-semibold'
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
            <p className='text-sm text-center lg:text-base'>
              Belum Punya Akun?{' '}
              <NavLink to='/register' className='font-bold text-prime '>
                Daftar Sekarang
              </NavLink>
            </p>
          </section>
        </article>
      </form>
    </div>
  );
};

export default Login;

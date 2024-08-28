import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Eye } from 'lucide-react';
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
  console.log({ loginField });

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
      navigate('/dashboard', { state: user });
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
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginField((prevValue) => ({ ...prevValue, [key]: e.target.value }));
  };
  return (
    <div>
      <form
        className="flex justify-center h-screen items-center flex-col shadow-md"
        onSubmit={handleLogin}
      >
        <article className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 shadow-lg w-1/3 py-12 px-8">
          <h1 className="text-center font-bold text-2xl">Login</h1>
          <p>Please field information below to login</p>
          <section className="flex flex-col gap-5">
            <InputField
              type="text"
              name="uniqueIdentity"
              title="Username or Email"
              placeholder="Enter your username or email"
              onInputChangeHandler={onInputChangeHandler}
              value={loginField.uniqueIdentity}
            />
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <div className="relative">
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="*********"
                  onChange={(e) => {
                    onInputChangeHandler('password', e);
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
            </div>

            <div className="flex flex-col gap-2 ">
              <Button>Login</Button>
              <p>
                Doesnt have an account?{' '}
                <NavLink to="/register" className="font-bold">
                  Register
                </NavLink>
              </p>
            </div>
          </section>
        </article>
      </form>
    </div>
  );
};

export default Login;

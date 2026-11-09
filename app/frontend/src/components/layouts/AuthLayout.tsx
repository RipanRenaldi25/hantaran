import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className='flex flex-1 flex-col px-4 py-10'>
      <div className='m-auto w-full lg:max-w-[500px]'>
        <Outlet />
      </div>
    </div>
  );
};

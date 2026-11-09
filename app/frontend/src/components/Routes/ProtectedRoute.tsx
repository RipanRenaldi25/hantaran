import { useAppDispatch } from '@/states';
import { asyncGetUserProfile } from '@/states/UserLogedInState';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const [isPreload, setIsPreload] = useState(true);
  const state = useSelector((states) => (states as any).userLogedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetUserProfile());
  }, [dispatch]);

  if (!state.email && !isPreload) {
    return <Navigate to='/login' replace />;
  }

  console.log('rendered');

  return <Outlet />;
};

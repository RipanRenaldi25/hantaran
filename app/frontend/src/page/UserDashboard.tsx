import React from 'react';
import { useAppSelector } from '@/components/states';
import { useLocation, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const userLogin = useAppSelector((state) => state.userLogedIn);
  const { state } = useLocation();
  if (!localStorage.getItem('ACCESS_TOKEN')) {
    navigate('/');
  }
  console.log({ state, userLogin });
  return <div>UserDashboard</div>;
};

export default UserDashboard;

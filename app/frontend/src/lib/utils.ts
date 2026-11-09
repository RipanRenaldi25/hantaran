import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export const formatTimer = (timer: number): string => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  let returnedTimer = '';
  if (minutes === 0) {
    returnedTimer += '00';
  } else {
    returnedTimer += `0${minutes}`;
  }

  if (seconds === 0) {
    returnedTimer += ':00';
  } else if (seconds < 10) {
    returnedTimer += `:0${seconds.toFixed(0)}`;
  } else {
    returnedTimer += `:${seconds.toFixed(0)}`;
  }

  console.log({ timer, minutes, seconds });

  return returnedTimer;
};

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  return accessToken;
};

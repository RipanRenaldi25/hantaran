import React from 'react';

interface IDashboardCard {
  title: string;
  value: any;
  children?: React.ReactNode;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'secondary';
}

const DashboardCard = ({
  title,
  value,
  description,
  variant = 'default',
}: IDashboardCard) => {
  return (
    <div className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1>{title}</h1>
      <h1>{value}</h1>
      <div className="relative">
        {variant === 'default' && (
          <h1 className="after:block after:h-[2px] after:w-full after:bg-black font-bold">
            {description}
          </h1>
        )}
        {variant === 'secondary' && (
          <h1 className="after:block after:h-[2px] after:w-full after:bg-yellow-400 text-yellow-500 font-bold">
            {description}
          </h1>
        )}
        {variant === 'success' && (
          <h1 className="after:block after:h-[2px] after:w-full after:bg-green-600 text-green-600 font-bold">
            {description}
          </h1>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;

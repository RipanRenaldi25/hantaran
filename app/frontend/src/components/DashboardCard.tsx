import React from 'react';

interface IDashboardCard {
  title: string;
  value: any;
  children?: React.ReactNode;
  description?: string;
}

const DashboardCard = ({ title, value, description }: IDashboardCard) => {
  return (
    <div className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1>{title}</h1>
      <h1>{value}</h1>
      <h1>{description}</h1>
    </div>
  );
};

export default DashboardCard;

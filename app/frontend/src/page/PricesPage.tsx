import { formatCurrency } from '@/lib/utils';
import { NavLink } from 'react-router-dom';

const PackageCard = ({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: any;
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center min-h-[40vh] relative">
    <h2 className="text-xl font-bold text-gray-800">{name}</h2>
    <p className="text-gray-600 my-4">{description}</p>
    <div className="flex flex-col absolute bottom-8 left-8 right-8">
      <span className="block text-teal-600 text-2xl font-bold">{price}</span>
      <NavLink
        to="/login"
        className="mt-4 bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600"
      >
        Select
      </NavLink>
    </div>
  </div>
);
const PricesPage = () => {
  const packages = [
    {
      name: 'Paket Hemat (Hubungi Penjual)',
      description:
        'Paket dimana jumlah box dan dekorasi dapat dipilih sesuai yang diinginkan',
      price: formatCurrency(0),
    },
    {
      name: 'Paket Umum',
      description:
        'Paket dasar dimana pilihan warna dan dekorasi dipilihkan oleh penjual (maksimal 10 box)',
      price: formatCurrency(500_000),
    },
    {
      name: 'Paket Standar',
      description:
        'Paket standar dengan maksimal 10 box dan masing-masing 1 dekorasi dan 1 warna',
      price: formatCurrency(500_000),
    },
  ];
  return (
    <div className="min-h-[70vh] flex-1 bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Available Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl place-items-center">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.name}
            name={pkg.name}
            description={pkg.description}
            price={pkg.price}
          />
        ))}
      </div>
    </div>
  );
};

export default PricesPage;

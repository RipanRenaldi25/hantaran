import React, { useEffect, useState } from 'react';
import { Check, Phone, X } from 'lucide-react';
import { getTransactionStatus } from '@/feature/order';
import { useNavigate, useParams } from 'react-router-dom';
import { resetUserLogedIn } from '@/states/UserLogedInState';

const PaymentSuccessPage = () => {
  const [transactionStatus, setTransactionStatus] = useState<{
    [key: string]: any;
  } | null>(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getStatus = async () => {
      if (!orderId) {
        console.log('No order id');
        return;
      }
      const data = await getTransactionStatus(orderId);
      setTransactionStatus(data);
    };
    getStatus();
  });
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col items-center justify-center p-8 bg-white border rounded-md shadow-md max-w-md mx-auto">
        {transactionStatus?.transaction_status === 'settlement' && (
          <>
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <Check className="text-green-500 border size-10" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Pembayaran Berhasil!
            </h2>
            <p className="mb-4 text-gray-600">
              Terima kasih atas pembelian Anda.
            </p>
            <p className="mb-4 text-gray-600 text-center">
              {/* Nomor Pesanan: <span className="font-bold">{orderNumber}</span> */}
              Nomor pesanan: {orderId}
            </p>
            <button
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={() => navigate('/user')}
            >
              Kembali ke Halaman Utama
            </button>
          </>
        )}
        {transactionStatus?.transaction_status === 'failed' ||
          (transactionStatus?.transaction_status === 'expire' && (
            <>
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <X className="text-red-500 size-7" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-700">
                {transactionStatus?.transaction_status === 'expire'
                  ? 'Transaksi telah kadaluarsa'
                  : 'Pembayaran Gagal'}
              </h2>
              <p className="mb-4 text-gray-600">
                Maaf, terjadi kesalahan pada transaksi Anda.
              </p>
              <button
                className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 flex gap-2 transition-colors"
                onClick={() =>
                  window.open(
                    `https://wa.me/+6281280010646?text=Nomor Pesanan: ${orderId}%0%0ANama Lengkap: %0AKendala: %0ABukti kendala: `,
                    '_blank'
                  )
                }
              >
                <Phone />
                Hubungi WhatsApp kami
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

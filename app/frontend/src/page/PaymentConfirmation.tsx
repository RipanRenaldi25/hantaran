import { getOrderWithItems } from '@/feature/order';
import { formatCurrency } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function PaymentConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<{ [key: string]: any }>();

  useEffect(() => {
    const getOrderItems = async () => {
      if (!orderId) {
        return;
      }
      const order = await getOrderWithItems(orderId);
      setOrder(order);
    };
    getOrderItems();
  }, []);
  console.log({ order });
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Terima Kasih Telah Berbelanja!
        </h1>
        <p className="text-center text-lg mb-4">
          Pesanan Anda telah diproses. Silakan lakukan pembayaran untuk
          menyelesaikan transaksi.
        </p>

        {/* Order Summary Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="bg-gray-100 p-4 rounded flex flex-col gap-5">
            {order?.boxes?.map((box: any) => (
              <div className="border-b border-gray-300">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Nama Produk</span>
                  <span>{box.boxName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Jumlah</span>
                  <span>{box.boxQuantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Harga</span>
                  <span>{formatCurrency(box.boxPrice)}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span className="font-medium">Total</span>
              <span>{formatCurrency(order?.order?.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Payment Instructions Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Instruksi Pembayaran</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">
              Silakan transfer menggunakan kode yang tertera di bawah ini
              virtual account dengan informasi berikut:
            </p>
            <div className="mb-4">
              <p>
                <strong>Metode Pembayaran:</strong>{' '}
                {order?.order?.paymentMethod}
              </p>
              {order?.order?.paymentMethod === 'echannel' && (
                <>
                  <p>
                    <strong>Nama Bank:</strong> Mandiri
                  </p>
                </>
              )}

              {order?.order?.paymentMethod === 'echannel' && (
                <div>
                  <p>
                    <strong>Biller Code: {order?.order?.biller_code}</strong>
                  </p>
                  <p>
                    <strong>Biller Key: {order?.order?.bill_key}</strong>
                  </p>
                </div>
              )}
              {order?.order?.paymentMethod === 'bank_transfer' && (
                <>
                  <p>
                    <strong>VA Number: {order?.order?.va_number}</strong>
                  </p>
                </>
              )}
            </div>
            {order?.order?.paymentMethod === 'qris' && (
              <>
                <p className="mb-2">
                  Anda dapat menggunakan QRIS untuk pembayaran:
                </p>
                <div className="w-[450px]">
                  <img
                    src={order?.order?.qrCodeUrl}
                    alt="qrCode"
                    className="rounded-md object-cover"
                  />
                </div>
              </>
            )}
            <p className="mt-8">
              <strong>Atas Nama:</strong> PT. Hantaran
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500">
          Setelah pembayaran, konfirmasi pembayaran Anda melalui halaman profil
          Anda.
        </p>
      </div>
    </div>
  );
}

export default PaymentConfirmation;

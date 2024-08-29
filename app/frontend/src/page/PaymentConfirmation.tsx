import { getOrderById } from '@/feature/order';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PaymentConfirmation() {
  const { state } = useLocation();
  const [order, setOrder] = useState<{ [key: string]: any }>();

  useEffect(() => {
    const getOrder = async () => {
      const order = await getOrderById(state.orderId);
      console.log({ order });
      setOrder(order);
    };
    getOrder();
  }, []);
  console.log({ state, order });
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
          <div className="bg-gray-100 p-4 rounded">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Nama Produk</span>
              <span>Beige Casual Bag</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Jumlah</span>
              <span>1</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Harga</span>
              <span>Rp0</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span className="font-medium">Total</span>
              <span>Rp{order?.price}</span>
            </div>
          </div>
        </div>

        {/* Payment Instructions Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Instruksi Pembayaran</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">
              Silakan transfer jumlah total ke rekening berikut:
            </p>
            <div className="mb-4">
              <p>
                <strong>Metode Pembayaran:</strong> {order?.paymentMethod}
              </p>
              {order?.paymentMethod === 'echannel' && (
                <>
                  <p>
                    <strong>Nama Bank:</strong> Mandiri
                  </p>
                  <p>
                    <strong>Nomor Rekening:</strong> 1234567890
                  </p>
                </>
              )}

              {order?.paymentMethod === 'echannel' && (
                <p>
                  <strong>Biller Code: {state.billerCode}</strong>
                  <strong>Biller Key: {state.billerKey}</strong>
                </p>
              )}
              {order?.paymentMethod === 'bank_transfer' && (
                <>
                  <p>
                    <strong>Bank Pilihan: {state.bankName}</strong>
                  </p>
                  <p>
                    <strong>VA Number: {state.vaNumber}</strong>
                  </p>
                </>
              )}
            </div>
            {order?.paymentMethod === 'qris' && (
              <>
                <p className="mb-2">
                  Atau Anda dapat menggunakan QRIS untuk pembayaran lebih cepat:
                </p>
                <div className="text-center">
                  <img
                    src={state.qrCodeUrl}
                    alt="QR Code"
                    className="inline-block"
                  />
                </div>
              </>
            )}
            <p>
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

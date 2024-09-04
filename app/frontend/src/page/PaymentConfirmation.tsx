import ButtonLoading from '@/components/ButtonLoading';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getOrderWithItems, getTransactionStatus } from '@/feature/order';
import { formatCurrency } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PaymentConfirmation() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<{ [key: string]: any } | null>();
  const [transactionStatus, setTransactionStatus] = useState<{
    [key: string]: any;
  }>({});
  const [transactionStatusChange, setTransactionStatusChange] = useState<{
    [key: string]: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const getStatus = async () => {
      if (!orderId) {
        return;
      }
      const data = await getTransactionStatus(orderId);
      setTransactionStatus(data);
    };
    const getOrderItems = async () => {
      if (!orderId) {
        return;
      }
      const order = await getOrderWithItems(orderId);
      setOrder(order);
    };
    Promise.all([getStatus(), getOrderItems()]);
  }, []);

  const handleChangeTransactionStatus = async () => {
    if (!orderId) {
      console.log('No order id');
      return;
    }
    setIsLoading(true);
    const data = await getTransactionStatus(orderId);
    console.log({ data });
    if (data.transaction_status === 'pending') {
      toast({
        title: 'Transaksi sedang diproses',
        description:
          'Harap pastikan anda telah membayar sebelum menyelesaikan transaksi',
      });
      setIsLoading(false);
      return;
    }
    if (data.transaction_status === 'expire') {
      toast({
        title: 'Expired',
        description: 'Transaksi anda telah kadaluarsa',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    setTransactionStatusChange(data);

    setIsLoading(false);
    navigate('/user/payment/success/' + orderId);
  };
  console.log({ transactionStatusChange, order });

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
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
            <h2 className="text-2xl font-semibold mb-4">
              Instruksi Pembayaran
            </h2>
            <div className="bg-gray-100 p-4 rounded">
              <p className="mb-2">
                Silakan transfer menggunakan kode yang tertera di bawah ini
                dengan metode pembayaran yang dipilih:
              </p>
              <div className="mb-4">
                <p>
                  <strong>Metode Pembayaran:</strong>{' '}
                  {order?.order?.paymentMethod}
                </p>

                {order?.order?.paymentMethod === 'echannel' && (
                  <div>
                    <p>
                      <strong>Nama Bank:</strong> Mandiri
                    </p>
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
                      <strong>
                        Bank Pilihan:{' '}
                        {Object.keys(transactionStatus).length <= 0
                          ? '-'
                          : transactionStatus?.va_numbers[0]?.bank}
                      </strong>
                    </p>
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
              <div className="flex gap-4 mt-4">
                <Button
                  onClick={handleChangeTransactionStatus}
                  className="flex gap-2"
                  disabled={isLoading}
                >
                  <ButtonLoading isLoading={isLoading} />
                  Cek Status Transaksi
                </Button>
                <Button onClick={() => navigate(`/user`)}>
                  Kembali ke halaman utama
                </Button>
              </div>
            </div>
          </div>

          <footer className="flex flex-col gap-5">
            <p className="text-gray-500">
              Setelah pembayaran, konfirmasi pembayaran Anda melalui halaman
              profil Anda atau klik tombol cek status transaksi di atas.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default PaymentConfirmation;

import { Button } from '@/components/ui/button';
import { createOrder } from '@/feature/order';
import { stringify } from 'querystring';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Landmark } from 'lucide-react';
import bca from '@/assets/bca.jpeg';
import bni from '@/assets/bni.jpeg';
import bri from '@/assets/bri.jpeg';
import mandiri from '@/assets/mandiri.jpeg';
import permata from '@/assets/permata.jpeg';
import qris from '@/assets/qris.jpg';
import { ICartItem } from '@/states/interface';

const OrderPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [selectedPaymentMethod, setSelectedpaymentMethod] = useState<
    'bca' | 'mandiri' | 'bri' | 'bni' | 'permata' | 'qris' | ''
  >('');
  const [isBankTransferOpen, setIsBankTransferOpen] = useState(false);
  const [billerKey, setBillerKey] = useState('');
  const [billerCode, setBillerCode] = useState('');
  const [vaNumber, setVaNumber] = useState('');
  const navigate = useNavigate();

  const handleOrder = async () => {
    const payload = {
      orderItems: state.items.map((item: any) => ({
        boxId: item.id,
        quantity: item.quantity,
        price: item.price === 0 ? 50_000 : item.price,
        name: item.box_name,
      })),
    };
    if (selectedPaymentMethod === 'qris') {
      (payload as any)['acquirer'] = 'gopay';
    } else if (selectedPaymentMethod === 'mandiri') {
      (payload as any)['billInfo1'] = 'hantaran';
      (payload as any)['billInfo2'] = '500000';
    } else {
      (payload as any)['bankName'] = selectedPaymentMethod;
      (payload as any)['vaNumber'] = '081280010646';
    }
    (payload as any)['paymentMethod'] = selectedPaymentMethod;
    const order = await createOrder(payload as any);
    console.log({ order });
    if (order.qrCode) {
      setQrCodeUrl(order.qrCode);
    }
    if (order.billerKey || order.billerCode) {
      setBillerCode(order.billerCode);
      setBillerKey(order.billerKey);
    }
    if (order?.vaNumbers?.length > 0) {
      const [vaNumber] = order?.vaNumbers;
      setVaNumber(vaNumber.va_number);
    }
    const payloadToSend = {
      orderId: order.id,
    };
    if (selectedPaymentMethod === 'qris') {
      (payloadToSend as any)['qrCodeUrl'] = order.qrCode;
    } else if (selectedPaymentMethod === 'mandiri') {
      (payloadToSend as any)['billerCode'] = order.billerCode;
      (payloadToSend as any)['billerKey'] = order.billerKey;
    } else {
      (payloadToSend as any)['bankName'] = order.vaNumbers[0].bank;
      (payloadToSend as any)['vaNumber'] = order.vaNumbers[0].va_number;
    }
    navigate(`/user/payment/${order.id}`, { state: payloadToSend });
  };
  console.log({ state });

  return (
    <div>
      {qrCodeUrl.length > 0 && (
        <div className="w-[450px]">
          <AspectRatio ratio={16 / 9}>
            <img
              src={qrCodeUrl}
              alt="qrCode"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      )}
      <>
        <div className="container">
          <h1 className="text-4xl font-semibold">Checkout Hantaran</h1>
          <div className="section payment-options">
            <h2>Pilih Metode Pembayaran</h2>
            <div className="container mx-auto p-6">
              <div className="section payment-options mb-4">
                {/* Dropdown menu for payment options */}
                <div className="mt-4 border border-gray-300 rounded shadow p-4">
                  <div className="payment-option flex gap-5 items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded">
                    <div className="flex items-center justify-center border p-4">
                      <Landmark className="size-10" />
                    </div>
                    <button
                      type="button"
                      className="payment-details text-left"
                      onClick={() =>
                        setIsBankTransferOpen((prevValue) => !prevValue)
                      }
                    >
                      <h3 className="text-lg font-medium">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">
                        Transfer ke rekening bank kami. Info rekening akan
                        dikirimkan setelah pemilihan.
                      </p>
                    </button>
                  </div>
                  {isBankTransferOpen && (
                    <>
                      <div
                        className={`payment-option flex items-center cursor-pointer hover:bg-gray-100 py-2 rounded px-10 ${
                          selectedPaymentMethod === 'bca' && 'bg-slate-400'
                        }`}
                        onClick={() => setSelectedpaymentMethod('bca')}
                      >
                        <img src={bca} alt="Bank Transfer" className="mr-4" />
                        <div className="payment-details">
                          <h3 className="text-lg font-medium">Bank BCA</h3>
                          <p className="text-sm text-gray-600">
                            Transfer ke rekening bank kami. Info rekening akan
                            dikirimkan setelah pemilihan.
                          </p>
                        </div>
                      </div>
                      <div
                        className={`payment-option flex items-center cursor-pointer hover:bg-gray-100 py-2 rounded px-10 ${
                          selectedPaymentMethod === 'mandiri' && 'bg-slate-400'
                        }`}
                        onClick={() => setSelectedpaymentMethod('mandiri')}
                      >
                        <img
                          src={mandiri}
                          alt="Bank Transfer"
                          className="mr-4"
                        />
                        <div className="payment-details">
                          <h3 className="text-lg font-medium">Bank Mandiri</h3>
                          <p className="text-sm text-gray-600">
                            Transfer ke rekening bank kami. Info rekening akan
                            dikirimkan setelah pemilihan.
                          </p>
                        </div>
                      </div>
                      <div
                        className={`payment-option flex items-center cursor-pointer hover:bg-gray-100 py-2 rounded px-10 ${
                          selectedPaymentMethod === 'bri' && 'bg-slate-400'
                        }`}
                        onClick={() => setSelectedpaymentMethod('bri')}
                      >
                        <img src={bri} alt="Bank Transfer" className="mr-4" />
                        <div className="payment-details">
                          <h3 className="text-lg font-medium">Bank BRI</h3>
                          <p className="text-sm text-gray-600">
                            Transfer ke rekening bank kami. Info rekening akan
                            dikirimkan setelah pemilihan.
                          </p>
                        </div>
                      </div>
                      <div
                        className={`payment-option flex items-center cursor-pointer hover:bg-gray-100 py-2 rounded px-10 ${
                          selectedPaymentMethod === 'bni' && 'bg-slate-400'
                        }`}
                        onClick={() => setSelectedpaymentMethod('bni')}
                      >
                        <img src={bni} alt="Bank Transfer" className="mr-4" />
                        <div className="payment-details">
                          <h3 className="text-lg font-medium">Bank BNI</h3>
                          <p className="text-sm text-gray-600">
                            Transfer ke rekening bank kami. Info rekening akan
                            dikirimkan setelah pemilihan.
                          </p>
                        </div>
                      </div>
                      <div
                        className={`payment-option flex items-center cursor-pointer hover:bg-gray-100 py-2 rounded px-10 ${
                          selectedPaymentMethod === 'permata' && 'bg-slate-400'
                        }`}
                        onClick={() => setSelectedpaymentMethod('permata')}
                      >
                        <img
                          src={permata}
                          alt="Bank Transfer"
                          className="mr-4"
                        />
                        <div className="payment-details">
                          <h3 className="text-lg font-medium">Bank Permata</h3>
                          <p className="text-sm text-gray-600">
                            Transfer ke rekening bank kami. Info rekening akan
                            dikirimkan setelah pemilihan.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    className={`payment-option flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                      selectedPaymentMethod === 'qris' && 'bg-slate-400'
                    }`}
                    onClick={() => setSelectedpaymentMethod('qris')}
                  >
                    <img src={qris} alt="QRIS" className="mr-4" />
                    <div className="payment-details">
                      <h3 className="text-lg font-medium">QRIS</h3>
                      <p className="text-sm text-gray-600">
                        Gunakan QRIS untuk melakukan pembayaran dengan aplikasi
                        e-wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Informasi Pengiriman</h2>
            <div className="input-group">
              <label htmlFor="alamat">Alamat Lengkap</label>
              <textarea
                id="alamat"
                name="alamat"
                placeholder="Masukkan alamat lengkap Anda"
              ></textarea>
            </div>
            <div className="input-group">
              <label htmlFor="tanggal-pernikahan">Tanggal Pernikahan</label>
              <input
                type="date"
                id="tanggal-pernikahan"
                name="tanggal-pernikahan"
              />
            </div>
          </div>

          <div className="section">
            <h2>Ringkasan Pesanan</h2>
            <div className="order-summary">
              {state.carts.map((item: ICartItem) => (
                <div className="order-item">
                  <img src="https://via.placeholder.com/100" alt="Hantaran 1" />
                  <div className="item-details">
                    <h3>{item.box_name}</h3>
                    <p>10 Kotak Hantaran - Sesuai Permintaan</p>
                  </div>
                  <div className="item-price">Rp 500,000</div>
                </div>
              ))}
              <div className="total-price">Total: Rp 500,000</div>
            </div>
          </div>

          <button className="checkout-btn" onClick={handleOrder}>
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </>
    </div>
  );
};

export default OrderPage;

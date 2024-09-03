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
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/states';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import ButtonLoading from '@/components/ButtonLoading';
import { clearCartState } from '@/states/Cart';

const OrderPage = () => {
  const { id } = useParams();
  const { carts } = useAppSelector((state) => state.cart);
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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [address, setAddress] = useState<string>('');
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [isOrderCreated, setIsOrderCreated] = useState<boolean>(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleOrder = async () => {
    if (!selectedPaymentMethod || !date || !address) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    setIsOrderCreated(true);
    const payload = {
      orderItems: state.carts.map((item: any) => ({
        boxId: item.id,
        quantity: item.quantity,
        price: item.price === 0 ? 50_000 : item.price,
        name: item.box_name,
      })),
      address,
      weddingDate: date.toISOString().split('T')[0],
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
    if (order?.qrCode) {
      setQrCodeUrl(order.qrCode);
    }
    if (order?.billerKey || order?.billerCode) {
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
    dispatch(clearCartState());
    setIsOrderCreated(false);
    setSelectedpaymentMethod('');
    setDate(undefined);
    setAddress('');
    navigate(`/user/payment/${order.id}`);
  };

  return (
    <div>
      <>
        <div className="container">
          <h1 className="text-4xl font-semibold">Checkout Hantaran</h1>
          <div className="section payment-options ">
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
                      <h3 className="text-lg font-medium">
                        Bank Virtual Account
                      </h3>
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
                          <h3 className="text-lg font-medium">
                            BCA Virtual Account
                          </h3>
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
                          <h3 className="text-lg font-medium">
                            Mandiri Virtual Account
                          </h3>
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
                          <h3 className="text-lg font-medium">
                            BRI Virtual Account
                          </h3>
                          <p className="text-sm text-gray-600">
                            Transfer melalui virtual account ke rekening di
                            bawah. Info pembayaran akan dikirimkan setelah
                            pemilihan.
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
                          <h3 className="text-lg font-medium">
                            BNI Virtual Account
                          </h3>
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
                          <h3 className="text-lg font-medium">
                            Permata Virtual Account
                          </h3>
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
            <div className="grid w-full gap-2 font-semibold mb-5">
              <Label htmlFor="message">Alamat Pengiriman</Label>
              <Textarea
                placeholder="Masukkan alamat pengiriman lengkap"
                id="message"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border-2"
              />
            </div>
            <div className="section flex flex-col gap-2 font-semibold">
              <label>Tanggal Pernikahan</label>
              <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[280px] justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="section">
            <h2>Ringkasan Pesanan</h2>
            <div className="order-summary flex flex-col gap-5">
              {state.carts.map((item: ICartItem) => (
                <div className="order-item flex justify-between items-center shadow-md p-4">
                  <div className="item-details flex gap-2 items-center">
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/public/${
                          item.box_image_url
                        }`}
                        alt="Hantaran 1"
                        className="w-20 h-20 object-cover rounded"
                      />
                      {/* <span className="absolute top-0 right-0 bg-gray-700 text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span> */}
                      <span className="absolute translate-x-1/2 -translate-y-1/2 top-0 right-0 bg-gray-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <h3>{item.box_name}</h3>
                      <p>Warna {item.color_name}</p>
                      <p>Dekorasi {item.decoration_name}</p>
                    </div>
                  </div>
                  <div className="item-price">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
              <div className="total-price">
                Total:{' '}
                {formatCurrency(
                  carts.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )
                )}
              </div>
            </div>
          </div>

          <button
            className={`checkout-btn flex items-center justify-center gap-2 ${
              isOrderCreated && 'bg-gray-400'
            }`}
            onClick={handleOrder}
            disabled={isOrderCreated}
          >
            <ButtonLoading isLoading={isOrderCreated} />
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </>
    </div>
  );
};

export default OrderPage;

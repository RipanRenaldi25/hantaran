import { Button } from '@/components/ui/button';
import { createOrder } from '@/feature/order';
import { stringify } from 'querystring';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrderPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log({ state, id });
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const handleOrder = async () => {
    const payload = {
      orderItems: state.items.map((item: any) => ({
        boxId: item.id,
        quantity: item.quantity,
        price: item.price === 0 ? 50_000 : item.price,
        name: item.box_name,
      })),
      paymentMethod: 'qris',
      acquirer: 'airpay shopee',
    };
    const order = await createOrder(payload);
    setQrCodeUrl(order.qrCode);
    console.log({ order });
  };

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
      <Button onClick={() => handleOrder()}>Buy</Button>
    </div>
  );
};

export default OrderPage;

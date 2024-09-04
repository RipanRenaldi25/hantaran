import { formatCurrency } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function OrderList({
  orders = [],
}: {
  orders: { [key: string]: any }[] | null;
}) {
  const navigate = useNavigate();
  return (
    <>
      {orders === null ? (
        <p className="text-gray-600">Anda belum memiliki riwayat pesanan.</p>
      ) : (
        <ul className="space-y-4 mt-10">
          {orders.map((order) => (
            <li
              key={order.id}
              className="p-4 bg-gray-100 rounded-md shadow-sm hover:cursor-pointer"
              onClick={() => navigate(`/user/payment/${order.id}`)}
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Nomor Pesanan: {order.id}</span>
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded-md ${
                    order.status === 'settlement'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Tanggal: {order.created_at}
              </div>
              <div className="mt-2">
                Total:
                {formatCurrency(order.price)} ({order.payment_method})
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default OrderList;

import TableComponent from '@/components/TableComponent';
import { getOrders } from '@/feature/order';
import { useAppDispatch, useAppSelector } from '@/states';
import { setOrder } from '@/states/OrderState';
import React, { useEffect } from 'react';

const OrderListPage = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);
  const getAllOrder = async () => {
    const orders = await getOrders();
    dispatch(setOrder(orders));
  };
  useEffect(() => {
    getAllOrder();
  }, []);
  return (
    <div>
      <TableComponent
        tableData={order.length ? order : []}
        tableHeader={[
          {
            name: 'id',
            as: 'Id',
          },
          {
            name: 'userId',
            as: 'User Id',
          },
          {
            name: 'price',
            as: 'Price',
          },
          {
            name: 'status',
            as: 'Status',
          },
          {
            name: 'paymentMethod',
            as: 'Payment Method',
          },
          {
            name: 'fullName',
            as: 'Full Name',
          },
          {
            name: 'phoneNumber',
            as: 'Phone Number',
          },
          {
            name: 'createdAt',
            as: 'Created At',
          },
          {
            name: 'updatedAt',
            as: 'Updated At',
          },
        ]}
      />
    </div>
  );
};

export default OrderListPage;

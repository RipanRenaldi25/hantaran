import React, { useEffect, useState } from 'react';
import OrderList from '@/components/OrderList';
import { getOrdersOwnedByUser } from '@/feature/order';
import { useAppSelector } from '@/states';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, ChevronDown, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

function UserTransactionPage() {
  // Contoh data order
  const [orders, setOrders] = useState<{ [key: string]: any }[]>([]);
  const [filteredOrder, setFilteredOrder] = useState(orders);
  const { userLoginWithProfile } = useAppSelector((state) => state.user);
  const [sortedByDate, setSortedbyDate] = useState<boolean>(false);
  const [sortedByProcessed, setSortedByProcessed] = useState<
    'processed' | 'completed' | 'unprocessed' | 'settlement'
  >('unprocessed');
  const [searchInput, setSearchInput] = useState<string>('');
  const [inputDebounce, setInputDebounce] = useDebounce(searchInput);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const getOrdersByUser = async () => {
      const orders = await getOrdersOwnedByUser(userLoginWithProfile?.id);
      if (!orders) {
        return;
      }
      setOrders(
        orders.map((order: any) => ({
          ...order,
          created_at: new Date(order.created_at).toISOString(),
          updated_at: new Date(order.updated_at).toISOString(),
        }))
      );
      setFilteredOrder(orders);
    };

    if (Object.keys(userLoginWithProfile).length > 0) {
      getOrdersByUser();
    }
  }, [userLoginWithProfile]);

  useEffect(() => {
    if (inputDebounce !== '' && orders.length > 0) {
      setFilteredOrder(
        orders?.filter((order) =>
          (order.id as string).includes(inputDebounce as string)
        )
      );
    }
    if (inputDebounce === '') {
      setFilteredOrder(orders);
    }
  }, [inputDebounce]);

  useEffect(() => {
    if (date) {
      setFilteredOrder((prevOrder: any) => {
        if (prevOrder === null) {
          return prevOrder;
        }
        return orders?.filter(
          (order: any) =>
            new Date(order.created_at).getTime() >= new Date(date).getTime()
        );
      });
    }
  }, [date]);
  const handleSortedProcess = (
    process: 'processed' | 'completed' | 'unprocessed' | 'settlement'
  ) => {
    setSortedByProcessed(process);
    setFilteredOrder((prevOrder: any) => {
      console.log({ prevOrder });
      if (prevOrder === null) {
        return prevOrder;
      }
      console.log({ sortedByProcessed });
      return orders?.filter(
        (order: any) =>
          order.manage_status === process || order.status === process
      );
    });
  };

  const handleSortedDate = () => {
    if (!filteredOrder) {
      return;
    }
    if (sortedByDate) {
      setSortedbyDate(false);
    } else {
      setSortedbyDate(true);
    }
    const sortedOrders = [...filteredOrder].sort(
      (a, b) =>
        new Date(!sortedByDate ? b.created_at : a.created_at).getTime() -
        new Date(!sortedByDate ? a.created_at : b.created_at).getTime()
    );
    setFilteredOrder(sortedOrders);
  };

  const handleReset = () => {
    setDate(undefined);
    setSearchInput('');
    setSortedByProcessed('unprocessed');
    setSortedbyDate(false);
    setFilteredOrder(orders);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 bg-white rounded-md shadow-lg w-11/12">
        <div className="flex items-center justify-between">
          <h2 className="mb-6 text-2xl font-semibold text-gray-700">
            Riwayat Pesanan
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Search
                className={cn(
                  'absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500'
                )}
              />
              <Input
                type="text"
                className={cn('w-96 border-2 shadow-sm px-10 text-md')}
                placeholder='Cari berdasarkan "nomor pesanan"'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Popover>
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
              <Button
                onClick={() => handleSortedDate()}
                className="flex items-center gap-1"
                variant={'outline'}
              >
                Tanggal Pesan
                <ArrowDownUp className="size-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'}>
                    {sortedByProcessed === 'unprocessed' && 'Belum Diproses'}
                    {sortedByProcessed === 'processed' && 'Sedang Diproses'}
                    {sortedByProcessed === 'completed' && 'Selesai'}
                    {sortedByProcessed === 'settlement' && 'Sudah Bayar'}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className={cn(
                    'w-full shadow-md p-4 flex flex-col gap-2 z-10 bg-white'
                  )}
                >
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortedProcess('unprocessed')}
                  >
                    Belum Diproses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortedProcess('processed')}
                  >
                    Diproses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortedProcess('completed')}
                  >
                    Selesai
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSortedProcess('settlement')}
                  >
                    Sudah bayar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => handleReset()}>Reset</Button>
            </div>
          </div>
        </div>
        {orders === null ? (
          <p className="text-gray-600">Anda belum memiliki riwayat pesanan.</p>
        ) : (
          <OrderList orders={!!filteredOrder ? filteredOrder : orders} />
        )}
      </div>
    </div>
  );
}

export default UserTransactionPage;

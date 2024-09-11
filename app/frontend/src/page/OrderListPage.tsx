import DashboardCard from '@/components/DashboardCard';
import TableComponent from '@/components/TableComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { getOrders } from '@/feature/order';
import { useAppDispatch, useAppSelector } from '@/states';
import { setOrder } from '@/states/OrderState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import {
  ArrowDownUp,
  Calendar as CalendarIcon,
  ChevronDown,
  Search,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

const OrderListPage = () => {
  const [filteredOrder, setFilteredOrder] = useState<any[]>([]);
  const [sortedByDate, setSortedbyDate] = useState<boolean>(false);
  const [sortedByProcessed, setSortedByProcessed] = useState<
    | 'processed'
    | 'completed'
    | 'unprocessed'
    | 'pending'
    | 'expire'
    | 'settlement'
  >('unprocessed');
  const [searchInput, setSearchInput] = useState<string>('');
  const [inputDebounce] = useDebounce(searchInput);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);
  const getAllOrder = async () => {
    const orders = await getOrders();
    console.log({ orders });
    dispatch(setOrder(orders));
    setFilteredOrder(orders);
  };
  useEffect(() => {
    getAllOrder();
  }, []);
  const totalOrder = order.length;
  const totalProcessed = order.reduce((acc, current) => {
    if (current.manageStatus === 'processed') {
      return (acc += 1);
    }
    return acc;
  }, 0);
  const totalPending = order.reduce((acc, current) => {
    if (current.manageStatus === 'unprocessed') {
      return (acc += 1);
    }
    return acc;
  }, 0);

  const totalCompleted = order.reduce((acc, current) => {
    if (current.manageStatus === 'completed') {
      return (acc += 1);
    }
    return acc;
  }, 0);

  const handleSortedProcess = (
    process: 'processed' | 'completed' | 'unprocessed' | 'settlement'
  ) => {
    setSortedByProcessed(process);
    setFilteredOrder((prevOrder: any) => {
      if (prevOrder === null) {
        return prevOrder;
      }
      console.log({ sortedByProcessed });
      return order?.filter(
        (order: any) =>
          order.manageStatus === process || order.status === process
      );
    });
  };

  const handleSortedDate = () => {
    console.log({ sortedByDate });
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
        new Date(!sortedByDate ? b.createdAt : a.createdAt).getTime() -
        new Date(!sortedByDate ? a.createdAt : b.createdAt).getTime()
    );
    setFilteredOrder(sortedOrders);
  };
  console.log({ order });

  const handleReset = () => {
    setDate(undefined);
    setSearchInput('');
    setSortedByProcessed('unprocessed');
    setSortedbyDate(false);
    setFilteredOrder(order);
  };
  useEffect(() => {
    if (inputDebounce !== '' && order.length > 0) {
      setFilteredOrder(
        order?.filter((order) =>
          (order.id as string).includes(inputDebounce as string)
        )
      );
    }
    if (inputDebounce === '') {
      setFilteredOrder(order);
    }
  }, [inputDebounce]);

  useEffect(() => {
    if (date) {
      setFilteredOrder((prevOrder: any) => {
        if (prevOrder === null) {
          return prevOrder;
        }
        return order?.filter(
          (order: any) =>
            new Date(order.createdAt).getTime() >= new Date(date).getTime()
        );
      });
    }
  }, [date]);

  return (
    <>
      <div className="p-4 rounded-lg flex flex-col gap-3">
        <Toaster />
        <header className="flex justify-between flex-col">
          <div className="p-8 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                Orders
              </h1>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-full">
                  <Search
                    className={cn(
                      'absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500'
                    )}
                  />
                  <Input
                    type="text"
                    className={cn('border-2 shadow-sm px-10 text-md')}
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
                        {sortedByProcessed === 'unprocessed' &&
                          'Belum Diproses'}
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
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              </div>
            </div>
            {
              order.length === 0 ? (
                <p className="text-gray-600">
                  Anda belum memiliki riwayat pesanan.
                </p>
              ) : null
              // <OrderList orders={!!filteredOrder ? filteredOrder : orders} />
            }
          </div>
          {/* <Dialog>
            <DialogTrigger>
              <Button>Tambah Box</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[800px] py-10">
              <DialogHeader>
                <DialogTitle>Tambah box</DialogTitle>
              </DialogHeader>
              <AddBox
                handleAddProduct={handleAddProduct}
                colors={colors}
                decorations={decorations}
                setColors={setColors}
                setDecorations={setDecorations}
              />
            </DialogContent>
          </Dialog> */}
        </header>
        <div className="grid grid-cols-4 gap-3">
          <DashboardCard
            title="Total Order"
            value={totalOrder || 0}
            description={`Total Order`}
          />
          <DashboardCard
            title="Total Processed"
            value={totalProcessed || 0}
            description={`Total Processed`}
          />
          <DashboardCard
            title="Total Pending"
            value={totalPending || 0}
            description={`Total Pending`}
            variant="secondary"
          />
          <DashboardCard
            title="Total Completed"
            value={totalCompleted || 0}
            description={`Total Completed`}
            variant="success"
          />
        </div>
        <div className="bg-white rounded-xl">
          <TableComponent
            tableData={!!filteredOrder ? filteredOrder : order}
            tableHeader={[
              {
                name: 'id',
                as: 'Nomor Pesanan',
              },
              {
                name: 'price',
                as: 'Harga',
              },
              {
                name: 'paymentMethod',
                as: 'Metode Pembayaran',
              },
              {
                name: 'fullName',
                as: 'Nama',
              },
              {
                name: 'phoneNumber',
                as: 'Nomor Telepon',
              },
              {
                name: 'createdAt',
                as: 'Tanggal Transaksi',
              },
              { name: 'date', as: 'Tanggal Pernikahan' },
              {
                name: 'status',
                as: 'Status Pembayaran',
              },
              { name: 'manageStatus', as: 'Proses' },
            ]}
            isRadioAction
          />
        </div>
      </div>
    </>
  );
};

export default OrderListPage;

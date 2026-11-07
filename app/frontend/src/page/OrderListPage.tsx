import DashboardCard from '@/components/DashboardCard';
import TableComponent from '@/components/TableComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { getOrders, updateOrderManageStatus } from '@/feature/order';
import { useAppDispatch, useAppSelector } from '@/states';
import { setOrder, setOrderStatus } from '@/states/OrderState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import {
  ArrowDownUp,
  Calendar as CalendarIcon,
  ChevronDown,
  Search,
  RotateCcw,
  Receipt,
  Clock,
  CheckCircle2,
  PackageCheck,
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
import { toast } from '@/components/ui/use-toast';

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
    | 'all'
  >('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [inputDebounce] = useDebounce(searchInput);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);

  const getAllOrder = async () => {
    const orders = await getOrders();
    dispatch(setOrder(orders));
    setFilteredOrder(orders);
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const totalOrder = order.length;
  const totalProcessed = order.reduce((acc, current) => {
    if (current.manageStatus === 'processed') return acc + 1;
    return acc;
  }, 0);
  const totalPending = order.reduce((acc, current) => {
    if (current.manageStatus === 'unprocessed') return acc + 1;
    return acc;
  }, 0);
  const totalCompleted = order.reduce((acc, current) => {
    if (current.manageStatus === 'completed') return acc + 1;
    return acc;
  }, 0);

  const handleSortedProcess = (process: string) => {
    setSortedByProcessed(process as any);
    if (process === 'all') {
      setFilteredOrder(order);
      return;
    }
    setFilteredOrder(
      order?.filter(
        (o: any) => o.manageStatus === process || o.status === process
      )
    );
  };

  const handleSortedDate = () => {
    if (!filteredOrder) return;
    setSortedbyDate(!sortedByDate);
    const sortedOrders = [...filteredOrder].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return !sortedByDate ? timeB - timeA : timeA - timeB;
    });
    setFilteredOrder(sortedOrders);
  };

  const handleReset = () => {
    setDate(undefined);
    setSearchInput('');
    setSortedByProcessed('all');
    setSortedbyDate(false);
    setFilteredOrder(order);
  };

  useEffect(() => {
    if (inputDebounce !== '' && order.length > 0) {
      setFilteredOrder(
        order?.filter((o) =>
          String(o.id).toLowerCase().includes(String(inputDebounce).toLowerCase()) ||
          String(o.fullName || '').toLowerCase().includes(String(inputDebounce).toLowerCase()) ||
          String(o.address || '').toLowerCase().includes(String(inputDebounce).toLowerCase()) ||
          String(o.phoneNumber || '').toLowerCase().includes(String(inputDebounce).toLowerCase())
        )
      );
    }
    if (inputDebounce === '') {
      setFilteredOrder(order);
    }
  }, [inputDebounce]);

  useEffect(() => {
    if (date) {
      setFilteredOrder(
        order?.filter(
          (o: any) =>
            new Date(o.createdAt).toDateString() === new Date(date).toDateString()
        )
      );
    }
  }, [date]);

  const handleChangeOrderManageStatus = async (
    orderId: string,
    status: 'processed' | 'completed' | 'unprocessed' | 'cancelled'
  ) => {
    const data = await updateOrderManageStatus(orderId, status);
    if (!data) {
      toast({
        description: 'Gagal memperbarui status pesanan',
        variant: 'destructive',
      });
      return;
    }
    toast({
      description: 'Status pesanan berhasil diperbarui',
    });
    dispatch(
      setOrderStatus({
        id: orderId,
        status,
        setStateToUpdate: setFilteredOrder,
      })
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Toaster />

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Pesanan"
          value={totalOrder || 0}
          description="Semua transaksi masuk"
          variant="default"
          icon={<Receipt className="w-5 h-5" />}
        />
        <DashboardCard
          title="Belum Diproses"
          value={totalPending || 0}
          description="Menunggu pengerjaan"
          variant="secondary"
          icon={<Clock className="w-5 h-5" />}
        />
        <DashboardCard
          title="Sedang Dikerjakan"
          value={totalProcessed || 0}
          description="Proses hias & tata seserahan"
          variant="default"
          icon={<PackageCheck className="w-5 h-5" />}
        />
        <DashboardCard
          title="Selesai Diambil"
          value={totalCompleted || 0}
          description="Pesanan telah siap"
          variant="success"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      {/* Filter and Search Bar Section */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              className="pl-10 min-h-[44px] rounded-xl border-border bg-stone-50/50 text-sm focus-visible:ring-primary"
              placeholder="Cari pesanan, nama, alamat, nomor telepon..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Action and Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Filter Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'min-h-[44px] rounded-xl border-border text-xs font-semibold px-4 flex items-center gap-2 hover:bg-secondary',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span>{date ? format(date, 'dd MMM yyyy') : 'Pilih Tanggal'}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Sort by Date Button */}
            <Button
              onClick={handleSortedDate}
              variant="outline"
              className="min-h-[44px] rounded-xl border-border text-xs font-semibold px-4 flex items-center gap-1.5 hover:bg-secondary"
            >
              <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
              <span>Urutkan Tanggal</span>
            </Button>

            {/* Status Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-h-[44px] rounded-xl border-border text-xs font-semibold px-4 flex items-center gap-2 hover:bg-secondary"
                >
                  <span>
                    {sortedByProcessed === 'all' && 'Semua Status'}
                    {sortedByProcessed === 'unprocessed' && 'Belum Diproses'}
                    {sortedByProcessed === 'processed' && 'Sedang Diproses'}
                    {sortedByProcessed === 'completed' && 'Selesai'}
                    {sortedByProcessed === 'settlement' && 'Sudah Bayar'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl">
                <DropdownMenuItem
                  className="cursor-pointer text-xs font-medium py-2 rounded-lg"
                  onClick={() => handleSortedProcess('all')}
                >
                  Semua Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs font-medium py-2 rounded-lg"
                  onClick={() => handleSortedProcess('unprocessed')}
                >
                  Belum Diproses
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs font-medium py-2 rounded-lg"
                  onClick={() => handleSortedProcess('processed')}
                >
                  Sedang Diproses
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs font-medium py-2 rounded-lg"
                  onClick={() => handleSortedProcess('completed')}
                >
                  Selesai
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer text-xs font-medium py-2 rounded-lg"
                  onClick={() => handleSortedProcess('settlement')}
                >
                  Sudah Bayar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Reset Button */}
            <Button
              onClick={handleReset}
              variant="ghost"
              size="icon"
              className="min-h-[44px] min-w-[44px] rounded-xl border border-border hover:bg-secondary text-muted-foreground"
              title="Reset Filter"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table Section */}
      <TableComponent
        tableData={filteredOrder || order}
        tableHeader={[
          { name: 'id', as: 'Nomor Pesanan' },
          { name: 'fullName', as: 'Pemesan' },
          { name: 'phoneNumber', as: 'Telepon' },
          { name: 'address', as: 'Alamat Pengiriman' },
          { name: 'price', as: 'Total Biaya' },
          { name: 'paymentMethod', as: 'Metode Bayar' },
          { name: 'createdAt', as: 'Tgl Transaksi' },
          { name: 'date', as: 'Tgl Pernikahan' },
          { name: 'status', as: 'Pembayaran' },
          { name: 'manageStatus', as: 'Proses Pesanan' },
        ]}
        isRadioAction
        onProcessHandler={handleChangeOrderManageStatus}
      />
    </div>
  );
};

export default OrderListPage;

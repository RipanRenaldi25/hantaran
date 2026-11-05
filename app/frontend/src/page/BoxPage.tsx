import AddBox from '@/components/AddBox';
import DashboardCard from '@/components/DashboardCard';
import TableComponent from '@/components/TableComponent';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import {
  createBoxAndConnectWithDecorationAndColor,
  getBoxes,
} from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import {
  addOnlyBoxes,
  setOnlyBoxes,
  setPage,
  setTotal,
} from '@/states/BoxState';
import { Box, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const BoxPage = () => {
  const [colors, setColors] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { onlyBoxes: boxes, total } = useAppSelector((state) => state.box);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const totalPage = Math.ceil((total || 0) / 10);
  const [searchParam] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get('page')) || 1
  );
  const isNext = currentPage < totalPage;
  const isPrevious = currentPage > 1;

  const getBox = async (page?: number, size?: number) => {
    const responseData = await getBoxes(page, size);
    if (responseData) {
      dispatch(setOnlyBoxes((responseData?.boxes as any) || []));
      dispatch(setTotal(responseData?.total || 0));
      dispatch(setPage(responseData?.page || 1));
    }
  };

  useEffect(() => {
    getBox(currentPage, 10);
  }, [currentPage]);

  const handleAddProduct = async ({
    name,
    image,
    price,
  }: {
    name: string;
    image: any;
    price: number;
  }) => {
    try {
      const boxId = await createBoxAndConnectWithDecorationAndColor(
        colors,
        decorations,
        { name, image, price }
      );
      if (boxId) {
        toast({
          title: 'Berhasil',
          description: 'Kotak hantaran baru berhasil ditambahkan',
        });
        dispatch(
          addOnlyBoxes({
            id: boxId || '',
            name: name,
            image_url: image ? URL.createObjectURL(image) : '',
            price: price,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        );
        setColors([]);
        setDecorations([]);
        setIsDialogOpen(false);
      }
    } catch (err: any) {
      toast({
        title: 'Gagal Menambah Box',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Toaster />

      {/* Action Header & Stat Card */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <DashboardCard
            title="Total Katalog Box"
            value={total || boxes.length || 0}
            description="Jenis kotak hantaran aktif"
            variant="default"
            icon={<Box className="w-5 h-5" />}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="min-h-[46px] rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-xs transition-all self-start sm:self-auto">
              <Plus className="w-4 h-4" />
              <span>Tambah Kotak Hantaran</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-w-[95vw] rounded-2xl p-6 sm:p-8">
            <DialogHeader className="pb-4 border-b border-border text-left">
              <DialogTitle className="font-serif text-xl font-bold text-foreground">
                Tambah Kotak Hantaran Baru
              </DialogTitle>
              <span className="text-xs text-muted-foreground mt-0.5">
                Masukkan rincian model kotak, foto akrilik, dan kaitkan pilihan warna & dekorasi
              </span>
            </DialogHeader>

            <AddBox
              handleAddProduct={handleAddProduct}
              colors={colors}
              decorations={decorations}
              setColors={setColors}
              setDecorations={setDecorations}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Boxes Data Table */}
      <TableComponent
        tableData={boxes || []}
        tableHeader={[
          { as: 'Nomor / ID Box', name: 'id' },
          { as: 'Nama Model Kotak', name: 'name' },
          { as: 'Harga Sewa', name: 'price' },
          { as: 'Tanggal Didaftarkan', name: 'created_at' },
        ]}
        currentPage={currentPage}
        isNext={isNext}
        isPrevious={isPrevious}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        isEditAction
      />
    </div>
  );
};

export default BoxPage;

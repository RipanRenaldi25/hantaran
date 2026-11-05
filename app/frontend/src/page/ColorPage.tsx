import ButtonLoading from '@/components/ButtonLoading';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { createColor, getColors } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import { setAllColors, setColor } from '@/states/ColorState';
import { Palette, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const ColorPage = () => {
  const { colors: allColors } = useAppSelector((state) => state.color);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newColor, setNewColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const getAllColor = async () => {
    const responseData = await getColors();
    if (responseData) {
      dispatch(setAllColors(responseData));
    }
  };

  useEffect(() => {
    getAllColor();
  }, []);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!newColor.trim()) {
      toast({
        title: 'Nama Warna Kosong',
        description: 'Silakan ketik nama warna terlebih dahulu',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const data = await createColor(newColor.trim());
    setIsLoading(false);

    if (!data) {
      toast({
        title: 'Gagal Menambah Warna',
        description: 'Nama warna sudah terdaftar atau terjadi gangguan koneksi',
        variant: 'destructive',
      });
      return;
    }

    dispatch(setColor({ id: data.id, name: data.name }));
    toast({
      title: 'Berhasil',
      description: `Warna "${data.name}" berhasil ditambahkan ke daftar master`,
    });
    setNewColor('');
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <Toaster />

      {/* Header and Stat Card */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <DashboardCard
            title="Total Pilihan Warna"
            value={allColors.length || 0}
            description="Kain & pita hantaran aktif"
            variant="default"
            icon={<Palette className="w-5 h-5" />}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="min-h-[46px] rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-xs transition-all self-start sm:self-auto">
              <Plus className="w-4 h-4" />
              <span>Tambah Warna Baru</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-w-[95vw] rounded-2xl p-6 sm:p-8">
            <DialogHeader className="pb-4 border-b border-border text-left">
              <DialogTitle className="font-serif text-xl font-bold text-foreground">
                Tambah Pilihan Warna Baru
              </DialogTitle>
              <span className="text-xs text-muted-foreground mt-0.5">
                Masukkan nama warna kain satin atau tema pita hantaran
              </span>
            </DialogHeader>

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 pt-2">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-foreground">
                  Nama Warna <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  name="color"
                  placeholder="Contoh: Dusty Rose / Rose Gold"
                  value={newColor}
                  onChange={(e: any) => setNewColor(e.target.value)}
                  className="min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[46px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-xs transition-all mt-2"
              >
                {isLoading ? (
                  <ButtonLoading isLoading={true} />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Simpan Warna</span>
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Colors Data Table */}
      <TableComponent
        tableData={allColors || []}
        tableHeader={[
          { as: 'ID Warna', name: 'id' },
          { as: 'Nama Warna', name: 'name' },
        ]}
      />
    </div>
  );
};

export default ColorPage;

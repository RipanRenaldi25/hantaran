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
import { createDecoration, getDecorations } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import { setAllDecorations, setDecoration } from '@/states/DecorationState';
import { Ribbon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const DecorationPage = () => {
  const { decorations: allDecorations } = useAppSelector(
    (state) => state.decoration
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newDecoration, setNewDecoration] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const getAllDecoration = async () => {
    const responseData = await getDecorations();
    if (responseData) {
      dispatch(setAllDecorations(responseData));
    }
  };

  useEffect(() => {
    getAllDecoration();
  }, []);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!newDecoration.trim()) {
      toast({
        title: 'Nama Dekorasi Kosong',
        description: 'Silakan ketik nama dekorasi terlebih dahulu',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const data = await createDecoration(newDecoration.trim());
    setIsLoading(false);

    if (!data) {
      toast({
        title: 'Gagal Menambah Dekorasi',
        description: 'Dekorasi sudah terdaftar atau terjadi gangguan koneksi',
        variant: 'destructive',
      });
      return;
    }

    dispatch(setDecoration({ id: data.id, name: data.name }));
    toast({
      title: 'Berhasil',
      description: `Dekorasi "${data.name}" berhasil ditambahkan ke daftar master`,
    });
    setNewDecoration('');
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <Toaster />

      {/* Header and Stat Card */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <DashboardCard
            title="Total Pilihan Dekorasi"
            value={allDecorations.length || 0}
            description="Ornamen floral & aksesoris aktif"
            variant="default"
            icon={<Ribbon className="w-5 h-5" />}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="min-h-[46px] rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-xs transition-all self-start sm:self-auto">
              <Plus className="w-4 h-4" />
              <span>Tambah Dekorasi Baru</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-w-[95vw] rounded-2xl p-6 sm:p-8">
            <DialogHeader className="pb-4 border-b border-border text-left">
              <DialogTitle className="font-serif text-xl font-bold text-foreground">
                Tambah Pilihan Dekorasi Baru
              </DialogTitle>
              <span className="text-xs text-muted-foreground mt-0.5">
                Masukkan nama ornamen bunga, pita, atau aksesoris seserahan
              </span>
            </DialogHeader>

            <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 pt-2">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-foreground">
                  Nama Dekorasi <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  name="decoration"
                  placeholder="Contoh: Rangkaian Bunga Rose & Baby Breath"
                  value={newDecoration}
                  onChange={(e: any) => setNewDecoration(e.target.value)}
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
                    <span>Simpan Dekorasi</span>
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Decorations Data Table */}
      <TableComponent
        tableData={allDecorations || []}
        tableHeader={[
          { as: 'ID Dekorasi', name: 'id' },
          { as: 'Nama Dekorasi', name: 'name' },
        ]}
      />
    </div>
  );
};

export default DecorationPage;

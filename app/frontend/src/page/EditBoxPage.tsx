import EditBox from '@/components/EditBox';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import {
  getBoxWithColorAndDecorationBelongToBox,
  updateBox,
} from '@/feature/box';
import { IColor, IDecoration } from '@/states/interface';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const EditBoxPage = () => {
  const [colors, setColors] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [deletedColors, setDeletedColors] = useState<IColor[]>([]);
  const [deletedDecoration, setDeletedDecoration] = useState<IDecoration[]>([]);
  const { id } = useParams();
  const [, setCurrentBox] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddProduct = async ({
    name,
    image,
    price,
    id,
  }: {
    name: string;
    image: any;
    price: number;
    id: string;
  }) => {
    const updatedBox = await updateBox(
      colors,
      decorations,
      {
        name,
        image,
        price,
        id,
      },
      deletedColors,
      deletedDecoration
    );
    if (!updatedBox) {
      toast({
        title: 'Gagal Memperbarui',
        description: 'Terjadi kesalahan saat menyimpan perubahan kotak',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Berhasil',
      description: 'Kotak hantaran berhasil diperbarui',
    });
    navigate('/dashboard/box');
  };

  useEffect(() => {
    const getBox = async () => {
      if (!id) return;
      const boxData = await getBoxWithColorAndDecorationBelongToBox(id);
      if (boxData) {
        setCurrentBox(boxData);
        setColors(boxData.colors || []);
        setDecorations(boxData.decorations || []);
      }
    };
    getBox();
  }, [id]);

  return (
    <div className="flex flex-col gap-6">
      <Toaster />

      {/* Header with Back Button */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-xl border-border text-xs font-semibold gap-2 hover:bg-secondary"
        >
          <NavLink to="/dashboard/box">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Box</span>
          </NavLink>
        </Button>

        <span className="text-xs text-muted-foreground font-mono">
          ID Box: {id}
        </span>
      </div>

      <EditBox
        colors={colors}
        decorations={decorations}
        handleAddProduct={handleAddProduct}
        setColors={setColors}
        setDecorations={setDecorations}
        deletedColors={deletedColors}
        deletedDecoration={deletedDecoration}
        setDeletedColors={setDeletedColors}
        setDeletedDecoration={setDeletedDecoration}
      />
    </div>
  );
};

export default EditBoxPage;

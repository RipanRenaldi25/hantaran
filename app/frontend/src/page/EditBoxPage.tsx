import EditBox from '@/components/EditBox';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import {
  getBoxWithColorAndDecorationBelongToBox,
  updateBox,
} from '@/feature/box';
import { IColor, IDecoration } from '@/states/interface';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
        title: 'Error',
        description: 'Cannot update box',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Success',
      description: 'Box Updated successfully',
    });
    navigate('/dashboard/box');
  };
  useEffect(() => {
    const getBox = async () => {
      if (!id) {
        return;
      }
      const boxData = await getBoxWithColorAndDecorationBelongToBox(id);
      setCurrentBox(boxData);
      setColors(boxData.colors);
      setDecorations(boxData.decorations);
    };
    getBox();
  }, []);

  return (
    <div>
      <Toaster />
      <EditBox
        colors={colors}
        decorations={decorations}
        handleAddProduct={handleAddProduct}
        setColors={setColors}
        setDecorations={setDecorations}
        deletedColors={deletedColors}
        setDeletedColors={setDeletedColors}
        deletedDecoration={deletedDecoration}
        setDeletedDecoration={setDeletedDecoration}
      />
    </div>
  );
};

export default EditBoxPage;

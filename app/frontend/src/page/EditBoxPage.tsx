import EditBox from '@/components/EditBox';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { updateBox } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditBoxPage = () => {
  const [colors, setColors] = useState([]);
  const [decorations, setDecorations] = useState([]);
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
    const updatedBox = await updateBox(colors, decorations, {
      name,
      image,
      price,
      id,
    });
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
  return (
    <div>
      <Toaster />
      <EditBox
        colors={colors}
        decorations={decorations}
        handleAddProduct={handleAddProduct}
        setColors={setColors}
        setDecorations={setDecorations}
      />
    </div>
  );
};

export default EditBoxPage;

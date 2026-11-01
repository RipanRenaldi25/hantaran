import boxImage from '@/assets/box1.jpg';
import { getColors, getDecorations } from '@/feature/box';
import { IColor, IDecoration } from '@/states/interface';
import React, { useEffect, useRef, useState } from 'react';
import ColorPicker from './ColorPicker';
import DecorationSelector from './DecorationSelector';
import { Button } from './ui/button';

import { CloudUpload } from 'lucide-react';
import ButtonLoading from './ButtonLoading';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
export interface IAddBox {
  handleAddProduct: any;
  colors: IColor[];
  setColors: any;
  decorations: IDecoration[];
  setDecorations: any;
  children?: React.ReactNode;
}

const AddBox = ({
  handleAddProduct,
  colors,
  decorations,
  setColors,
  setDecorations,
}: IAddBox) => {
  const { toast } = useToast();
  const [availableColors, setAvailableColors] = useState<IColor[]>([]);
  const [availableDecorations, setAvailableDecorations] = useState<
    IDecoration[]
  >([]);
  // const [newDecorations, setNewDecorations] = useState<IDecoration[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newBox, setNewBox] = useState<{
    name: string;
    price: number;
    image: any;
  }>({ image: null, name: '', price: 0 });

  useEffect(() => {
    const getAllColors = async () => {
      const colorsData = await getColors();

      setAvailableColors(colorsData);
    };
    const getAllDecorations = async () => {
      const decorationsData = await getDecorations();

      setAvailableDecorations(decorationsData);
    };

    getAllColors();
    getAllDecorations();
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(newBox)) {
      if (!value) {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: `Please fill in ${key} field`,
        });
        return;
      }
    }
    setIsLoading(true);
    handleAddProduct(newBox);
    setNewBox({ image: null, name: '', price: 0 });
    setIsLoading(false);
  };

  return (
    <div className="py-5 flex flex-col justify-between max-h-[80vh] overflow-hidden overflow-y-scroll shadow-lg rounded-xl">
      <div className="relative py-10 sm:max-w-xl sm:mx-auto w-full ">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-3 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl -z-10"></div>
        <div className="px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20 bg-white">
          <div className="max-w-md mx-auto max-h-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex flex-col items-center gap-5 group border-2 border-dashed">
                {newBox.image !== null ? (
                  <img
                    src={
                      newBox.image !== null
                        ? URL.createObjectURL(newBox.image)
                        : boxImage
                    }
                    className="size-64 group-hover:cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                  />
                ) : (
                  <div className="flex flex-col justify-start">
                    <CloudUpload
                      className="size-36 hover:cursor-pointer shadow-sm"
                      onClick={() => inputRef.current?.click()}
                    />
                  </div>
                )}
                <Input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    if (!e.target.files) {
                      return;
                    }
                    if (e.target.files.length === 0) {
                      return;
                    }
                    setNewBox((prevValue) => ({
                      ...prevValue,
                      [e.target.name]: e.target.files![0],
                    }));
                  }}
                  ref={inputRef}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">Nama Box</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nama Box"
                  value={newBox.name}
                  onChange={(e) =>
                    setNewBox((prevValue) => ({
                      ...prevValue,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">Harga</label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Harga"
                  value={newBox.price}
                  onChange={(e) =>
                    setNewBox((prevValue) => ({
                      ...prevValue,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">Warna</label>
                <ColorPicker
                  availableColors={availableColors}
                  colors={colors}
                  setColors={setColors}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-bold mb-2">Dekorasi</label>
                <DecorationSelector
                  decorations={decorations}
                  setDecorations={setDecorations}
                  availableDecorations={availableDecorations}
                />
              </div>

              {isLoading ? (
                <ButtonLoading isLoading={true} />
              ) : (
                <Button className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Tambah Box
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBox;

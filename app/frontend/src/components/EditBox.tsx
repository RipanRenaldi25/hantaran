import boxImage from '@/assets/box1.jpg';
import ColorPicker from '@/components/ColorPicker';
import DecorationSelector from '@/components/DecorationSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  getBoxWithColorAndDecorationBelongToBox,
  getColors,
  getDecorations,
} from '@/feature/box';
import { IColor, IDecoration } from '@/states/interface';
import { CloudUpload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonLoading from './ButtonLoading';
export interface IAddBox {
  handleAddProduct: any;
  colors: IColor[];
  setColors: any;
  decorations: IDecoration[];
  setDecorations: any;
  children?: React.ReactNode;
}

const EditBox = ({
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
  const [currentBox, setCurrentBox] = useState<{
    boxes: {
      box_id: string;
      box_image_url: string;
      box_name: string;
      box_price: number;
    };
    colors: { box_id: string; color_id: string; name: string }[];
    decorations: { decoration_id: string; box_id: string; name: string }[];
  } | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getAllColors = async () => {
      const colorsData = await getColors();

      setAvailableColors(colorsData);
    };
    const getAllDecorations = async () => {
      const decorationsData = await getDecorations();

      setAvailableDecorations(decorationsData);
    };

    const getBox = async () => {
      if (!id) {
        return;
      }
      const boxData = await getBoxWithColorAndDecorationBelongToBox(id);
      console.log({ boxData });
      setCurrentBox(boxData);
    };

    Promise.all([getAllColors(), getAllDecorations(), getBox()]);
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    handleAddProduct({
      name: newBox.name || currentBox?.boxes.box_name,
      image: newBox.image,
      price: newBox.price || currentBox?.boxes.box_price,
      id,
    });

    setIsLoading(false);
  };

  return (
    <div className="py-5 flex flex-col justify-center overflow-hidden shadow-lg rounded-xl">
      <div className="relative py-10 sm:max-w-xl sm:mx-auto w-full ">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-3 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
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
                ) : currentBox?.boxes?.box_image_url === null ? (
                  <div className="flex flex-col justify-start">
                    <CloudUpload
                      className="size-36 hover:cursor-pointer shadow-sm"
                      onClick={() => inputRef.current?.click()}
                    />
                  </div>
                ) : (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/public/${
                      currentBox?.boxes?.box_image_url
                    }`}
                    className="size-64 group-hover:cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                    alt="box image"
                  />
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Nama Box
                </label>
                <input
                  type="text"
                  value={newBox.name || currentBox?.boxes?.box_name}
                  name={'name'}
                  onChange={(e) =>
                    setNewBox((prevValue) => ({
                      ...prevValue,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring focus:ring-teal-500 focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Harga Box
                </label>
                <input
                  type="number"
                  value={
                    newBox.price > 0
                      ? newBox.price
                      : currentBox?.boxes?.box_price
                  }
                  name={'price'}
                  onChange={(e) =>
                    setNewBox((prevValue) => ({
                      ...prevValue,
                      [e.target.name]: +e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring focus:ring-teal-500 focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>
              <ColorPicker
                colors={colors}
                setColors={setColors}
                availableColors={availableColors.filter((availableColor) => {
                  const colorId = availableColor.id;
                  return !currentBox?.colors?.some(
                    (color) => color.color_id === colorId
                  );
                })}
                setAvailableColors={setAvailableColors}
              />
              <DecorationSelector
                decorations={decorations}
                setDecorations={setDecorations}
                availableDecorations={availableDecorations.filter(
                  (availableDecoration) => {
                    const colorId = availableDecoration.id;
                    return !currentBox?.decorations?.some(
                      (decor) => decor.decoration_id === colorId
                    );
                  }
                )}
                setAvailableDecorations={setAvailableDecorations}
              />
              <Button
                type="submit"
                className={`mt-5 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-300 flex gap-2 ${
                  isLoading && 'bg-green-300'
                }`}
                disabled={isLoading}
              >
                {<ButtonLoading isLoading={isLoading} />}Ubah
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBox;

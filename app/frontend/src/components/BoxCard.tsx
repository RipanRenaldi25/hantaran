import { useAppSelector } from '@/states';
import React, { useState } from 'react';
import { useToast } from './ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BoxCard({
  image,
  name,
  price,
  id,
  onAddToCart,
  selectedColor,
  selectedDecoration,
  setSelectedColor,
  setSelectedDecoration,
}: {
  image: string;
  name: string;
  price: number;
  id: string;
  onAddToCart: any;
  selectedColor: string;
  selectedDecoration: string;
  setSelectedColor: any;
  setSelectedDecoration: any;
}) {
  const { toast } = useToast();
  const [addedToCart, setAddedToCart] = useState(false);
  const { boxesWithColorAndDecoration } = useAppSelector((state) => state.box);
  const handleAddToCart = () => {
    console.log({ selectedColor, selectedDecoration });
    if (!selectedColor || !selectedDecoration) {
      toast({
        title: 'Error',
        description: 'Please select color and decoration!',
        variant: 'destructive',
      });
      return;
    }
    setAddedToCart(true);
    onAddToCart(selectedColor, selectedDecoration);
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/public/${image}`}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 text-gray-700 font-bold">{name}</h3>
      <p className="mt-1 text-gray-500">Rp{price}</p>

      <div className="mt-2">
        <Select
          onValueChange={(e) => setSelectedColor(e)}
          value={selectedColor}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Color" />
          </SelectTrigger>
          <SelectContent>
            {boxesWithColorAndDecoration.map((box) =>
              box.colors.map((color) => (
                <SelectItem value={color.name}>{color.name}</SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2">
        <Select
          onValueChange={(e) => setSelectedDecoration(e)}
          value={selectedDecoration}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Decoration" />
          </SelectTrigger>
          <SelectContent>
            {boxesWithColorAndDecoration.map((box) =>
              box.decorations.map((decoration) => (
                <SelectItem value={decoration.name}>
                  {decoration.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Tombol untuk menambahkan ke keranjang */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 py-2 px-4 rounded ${'bg-yellow-700'} text-white`}
      >
        Add
      </button>
    </div>
  );
}

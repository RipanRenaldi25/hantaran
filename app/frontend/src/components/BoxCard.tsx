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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SelectLabel } from '@radix-ui/react-select';
import { Button } from './ui/button';
import { formatCurrency } from '@/lib/utils';

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
  const [isAddItemOpen, setisAddItemOpen] = useState(false);
  const { boxesWithColorAndDecoration, groupedBoxes } = useAppSelector(
    (state) => state.box
  );
  const handleAddToCart = () => {
    if (!selectedColor || !selectedDecoration) {
      toast({
        title: 'Error',
        description: 'Please select color and decoration!',
        variant: 'destructive',
      });
      return;
    }
    setisAddItemOpen(false);
    onAddToCart(selectedColor, selectedDecoration);
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-lg">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/public/${image}`}
          alt={name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-2 text-gray-700 font-bold">{name}</h3>
        <p className="mt-1 text-gray-500">{formatCurrency(price)}</p>

        <Dialog open={isAddItemOpen} onOpenChange={setisAddItemOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setisAddItemOpen(true)}
              className={`mt-4 py-2 px-4 rounded ${'bg-yellow-700'} text-white`}
            >
              Add
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add items</DialogTitle>
            </DialogHeader>
            <article className="flex flex-col">
              <div className="mt-2">
                <h1 className="font-bold mb-2">Select Colors</h1>
                <Select
                  onValueChange={(e) => setSelectedColor(e)}
                  value={selectedColor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {boxesWithColorAndDecoration
                      .find((box) => box.id === id)
                      ?.colors.map((color) => (
                        <SelectItem key={color.id} value={color.name}>
                          {color.name}
                        </SelectItem>
                      ))}
                    {/* {groupedBoxes[id]?.map((box) => (
                      <SelectItem key={box.color_id} value={box.color_name}>
                        {box.color_name}
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-2">
                <h1 className="font-bold mb-2">Select Decorations</h1>
                <Select
                  onValueChange={(e) => setSelectedDecoration(e)}
                  value={selectedDecoration}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Decoration" />
                  </SelectTrigger>
                  <SelectContent>
                    {boxesWithColorAndDecoration
                      .find((box) => box.id === id)
                      ?.decorations.map((color) => (
                        <SelectItem key={color.id} value={color.name}>
                          {color.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <footer className="mt-5">
                <Button className="w-full" onClick={handleAddToCart}>
                  Simpan
                </Button>
              </footer>
            </article>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

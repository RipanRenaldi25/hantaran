import ColorPicker from '@/components/ColorPicker';
import DecorationSelector from '@/components/DecorationSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  getBoxWithColorAndDecorationBelongToBox,
  getColors,
  getDecorations,
} from '@/feature/box';
import { IColor, IDecoration } from '@/states/interface';
import { CloudUpload, Save } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonLoading from './ButtonLoading';

export interface IAddBox {
  handleAddProduct: any;
  colors: IColor[];
  setColors: any;
  decorations: IDecoration[];
  setDecorations: any;
  deletedColors: { id: string; name: string }[];
  setDeletedColors: any;
  deletedDecoration: { id: string; name: string }[];
  setDeletedDecoration: any;
  children?: React.ReactNode;
}

const EditBox = ({
  handleAddProduct,
  colors,
  decorations,
  setColors,
  setDecorations,
  deletedColors,
  deletedDecoration,
  setDeletedColors,
  setDeletedDecoration,
}: IAddBox) => {
  const [availableColors, setAvailableColors] = useState<IColor[]>([]);
  const [availableDecorations, setAvailableDecorations] = useState<IDecoration[]>([]);
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
      setAvailableColors(colorsData || []);
    };
    const getAllDecorations = async () => {
      const decorationsData = await getDecorations();
      setAvailableDecorations(decorationsData || []);
    };

    const getBox = async () => {
      if (!id) return;
      const boxData = await getBoxWithColorAndDecorationBelongToBox(id);
      setCurrentBox(boxData);
    };

    Promise.all([getAllColors(), getAllDecorations(), getBox()]);
  }, [id]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await handleAddProduct({
      name: newBox.name || currentBox?.boxes.box_name,
      image: newBox.image,
      price: newBox.price || currentBox?.boxes.box_price,
      id,
    });
    setIsLoading(false);
  };

  return (
    <div className="bg-white border border-border rounded-2xl p-6 sm:p-10 shadow-xs max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Foto Box Preview & Change */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
            Foto Kotak Hantaran
          </Label>
          <div
            onClick={() => inputRef.current?.click()}
            className="group relative border-2 border-dashed border-border hover:border-primary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-secondary/40 min-h-[220px]"
          >
            {newBox.image !== null ? (
              <div className="relative w-full max-w-xs aspect-video rounded-xl overflow-hidden shadow-xs border border-border">
                <img
                  src={URL.createObjectURL(newBox.image)}
                  alt="Preview Hantaran Baru"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  Klik untuk ganti foto baru
                </div>
              </div>
            ) : currentBox?.boxes?.box_image_url ? (
              <div className="relative w-full max-w-xs aspect-video rounded-xl overflow-hidden shadow-xs border border-border">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/public/${currentBox.boxes.box_image_url}`}
                  alt={currentBox.boxes.box_name || 'Foto Kotak'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  Klik untuk ubah foto
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-2 text-muted-foreground group-hover:text-foreground">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-2xs group-hover:scale-110 transition-transform">
                  <CloudUpload className="w-6 h-6" />
                </div>
                <div className="font-semibold text-sm text-foreground">
                  Pilih Foto Pengganti
                </div>
              </div>
            )}
            <Input
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewBox((prev) => ({
                    ...prev,
                    image: e.target.files![0],
                  }));
                }
              }}
              ref={inputRef}
              className="hidden"
            />
          </div>
        </div>

        {/* Input Nama & Harga */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-foreground">Nama Kotak</Label>
            <Input
              type="text"
              name="name"
              placeholder={currentBox?.boxes?.box_name || 'Nama Kotak'}
              value={newBox.name || currentBox?.boxes?.box_name || ''}
              onChange={(e) =>
                setNewBox((prev) => ({ ...prev, name: e.target.value }))
              }
              className="min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-foreground">Harga Sewa (Rp)</Label>
            <Input
              type="number"
              name="price"
              placeholder={String(currentBox?.boxes?.box_price || 0)}
              value={newBox.price || currentBox?.boxes?.box_price || ''}
              onChange={(e) =>
                setNewBox((prev) => ({ ...prev, price: Number(e.target.value) }))
              }
              className="min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Color and Decoration Management */}
        <div className="flex flex-col gap-5 pt-4 border-t border-border">
          <div>
            <Label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
              Pilihan Warna Terkait
            </Label>
            <ColorPicker
              availableColors={availableColors}
              colors={colors}
              setColors={setColors}
              deletedColors={deletedColors}
              setDeletedColors={setDeletedColors}
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
              Pilihan Dekorasi Terkait
            </Label>
            <DecorationSelector
              decorations={decorations}
              setDecorations={setDecorations}
              availableDecorations={availableDecorations}
              deletedDecoration={deletedDecoration}
              setDeletedDecoration={setDeletedDecoration}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-border">
          {isLoading ? (
            <ButtonLoading isLoading={true} />
          ) : (
            <Button
              type="submit"
              className="w-full min-h-[46px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Kotak</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditBox;

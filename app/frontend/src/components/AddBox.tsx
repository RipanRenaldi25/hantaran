import { getColors, getDecorations } from '@/feature/box';
import { IColor, IDecoration } from '@/states/interface';
import React, { useEffect, useRef, useState } from 'react';
import ColorPicker from './ColorPicker';
import DecorationSelector from './DecorationSelector';
import { Button } from './ui/button';
import { CloudUpload, Plus } from 'lucide-react';
import ButtonLoading from './ButtonLoading';
import { Input } from './ui/input';
import { Label } from './ui/label';
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
  const [availableDecorations, setAvailableDecorations] = useState<IDecoration[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newBox, setNewBox] = useState<{
    name: string;
    price: number;
    image: any;
  }>({ image: null, name: '', price: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllColors = async () => {
      const colorsData = await getColors();
      setAvailableColors(colorsData || []);
    };
    const getAllDecorations = async () => {
      const decorationsData = await getDecorations();
      setAvailableDecorations(decorationsData || []);
    };

    getAllColors();
    getAllDecorations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBox.name) {
      toast({
        title: 'Form Belum Lengkap',
        variant: 'destructive',
        description: 'Nama kotak hantaran wajib diisi',
      });
      return;
    }
    if (!newBox.price || newBox.price <= 0) {
      toast({
        title: 'Form Belum Lengkap',
        variant: 'destructive',
        description: 'Harga sewa per box harus lebih dari 0',
      });
      return;
    }
    if (!newBox.image) {
      toast({
        title: 'Form Belum Lengkap',
        variant: 'destructive',
        description: 'Silakan pilih foto kotak hantaran terlebih dahulu',
      });
      return;
    }

    setIsLoading(true);
    await handleAddProduct(newBox);
    setNewBox({ image: null, name: '', price: 0 });
    setIsLoading(false);
  };

  return (
    <div className="max-h-[75vh] overflow-y-auto px-1">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Upload Image Dropzone */}
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
                  alt="Preview Hantaran"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  Klik untuk ganti foto
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-2 text-muted-foreground group-hover:text-foreground">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-2xs group-hover:scale-110 transition-transform">
                  <CloudUpload className="w-6 h-6" />
                </div>
                <div className="font-semibold text-sm text-foreground">
                  Unggah Foto Kotak Akrilik
                </div>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Format PNG, JPG, atau JPEG (Maks. 5MB)
                </p>
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

        {/* Name and Price Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-foreground">Nama Kotak</Label>
            <Input
              type="text"
              name="name"
              placeholder="Contoh: Kotak Akrilik White Pearl"
              value={newBox.name}
              onChange={(e) =>
                setNewBox((prev) => ({ ...prev, name: e.target.value }))
              }
              className="min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-foreground">Harga Sewa (Rp)</Label>
            <Input
              type="number"
              name="price"
              placeholder="Contoh: 50000"
              value={newBox.price ? String(newBox.price) : ''}
              onChange={(e) =>
                setNewBox((prev) => ({ ...prev, price: Number(e.target.value) }))
              }
              className="min-h-[44px] rounded-xl border-border focus-visible:ring-primary"
              required
            />
          </div>
        </div>

        {/* Color and Decoration Selectors */}
        <div className="flex flex-col gap-4 pt-2 border-t border-border">
          <div>
            <Label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
              Kaitkan Pilihan Warna
            </Label>
            <ColorPicker
              availableColors={availableColors}
              colors={colors}
              setColors={setColors}
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
              Kaitkan Pilihan Dekorasi
            </Label>
            <DecorationSelector
              decorations={decorations}
              setDecorations={setDecorations}
              availableDecorations={availableDecorations}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border">
          {isLoading ? (
            <ButtonLoading isLoading={true} />
          ) : (
            <Button
              type="submit"
              className="w-full min-h-[46px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Kotak Hantaran Baru</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBox;

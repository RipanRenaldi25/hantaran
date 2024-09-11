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
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { createColor, getColors } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import { setAllColors, setColor } from '@/states/ColorState';
import { useEffect, useState } from 'react';
const ColorPage = () => {
  const { colors: allColors } = useAppSelector((state) => state.color);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const getAllColor = async () => {
    const responseData = await getColors();
    if (!responseData) {
      return;
    }
    console.log({ responseData });
    dispatch(setAllColors(responseData));
  };
  useEffect(() => {
    getAllColor();
  }, []);
  const [newColor, setNewColor] = useState<string>('');

  const [isLoading] = useState<boolean>(false);

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const data = await createColor(newColor);
    if (!data) {
      toast({
        title: 'Failed',
        description: 'Warna gagal ditambahkan / warna sudah ada',
        variant: 'destructive',
      });
      return;
    }
    dispatch(setColor({ id: data.id, name: data.name }));
    toast({
      title: 'Success',
      description: 'Warna baru ditambahkan',
    });
  };

  console.log({ allColors });
  return (
    <div className="p-4 rounded-lg flex flex-col gap-3">
      <Toaster />
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Boxes</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Tambah Warna</Button>
          </DialogTrigger>
          <DialogContent className="min-w-[800px] py-10">
            <DialogHeader>
              <DialogTitle>Tambah Warna</DialogTitle>
            </DialogHeader>
            <div className="py-5 flex flex-col justify-center max-h-[80vh] overflow-hidden overflow-y-scroll shadow-lg rounded-xl">
              <div className="relative py-10 sm:max-w-xl sm:mx-auto w-full ">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-3 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto max-h-full">
                    <form
                      onSubmit={onSubmitHandler}
                      className="flex flex-col gap-2"
                    >
                      <div className="mb-4 flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-600">
                          Nama warna
                        </label>
                        <Input
                          type="text"
                          name={'color'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring focus:ring-teal-500 focus:outline-none"
                          placeholder="Enter color name"
                          value={newColor}
                          onChange={(e: any) => setNewColor(e.target.value)}
                        />
                      </div>
                      <Button
                        type="submit"
                        className={`mt-5 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-300 flex gap-2 ${
                          isLoading && 'bg-green-300'
                        }`}
                        disabled={isLoading}
                      >
                        {<ButtonLoading isLoading={isLoading} />}Tambah
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid grid-cols-3 gap-3">
        <DashboardCard
          title="Total Color"
          value={allColors.length || 0}
          description={`Total Colors`}
        />
      </div>
      <div className="bg-white rounded-xl">
        <TableComponent
          tableData={allColors?.length ? allColors : []}
          tableHeader={[
            {
              as: 'Id',
              name: 'id',
            },
            {
              as: 'Warna',
              name: 'name',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ColorPage;

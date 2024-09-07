import TableComponent from '@/components/TableComponent';
import {
  createBoxAndConnectWithDecorationAndColor,
  getBoxes,
} from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import React, { useEffect, useState } from 'react';
import { setBoxes, setOnlyBoxes, setPage, setTotal } from '@/states/BoxState';
import { Button } from '@/components/ui/button';
import { NavLink, useSearchParams } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddBox from '@/components/AddBox';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

const BoxPage = () => {
  const [colors, setColors] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const {
    onlyBoxes: boxes,
    page,
    total,
  } = useAppSelector((state) => state.box);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const totalPage = Math.ceil(total / 10);
  const [searchParam, setSearchParam] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get('page')) || 1
  );
  const isNext = currentPage < totalPage;
  const isPrevious = currentPage > 1;

  useEffect(() => {}, [currentPage]);

  const getBox = async (page?: number, size?: number) => {
    const responseData = await getBoxes(page, size);
    dispatch(setOnlyBoxes(responseData?.boxes));
    dispatch(setTotal(responseData?.total));
    dispatch(setPage(responseData.page));
  };
  useEffect(() => {
    getBox(currentPage, 10);
  }, [currentPage]);

  const handleAddProduct = async ({
    name,
    image,
    price,
  }: {
    name: string;
    image: any;
    price: number;
  }) => {
    try {
      const boxId = await createBoxAndConnectWithDecorationAndColor(
        colors,
        decorations,
        { name, image, price }
      );
      console.log({ boxId });
      if (boxId) {
        toast({
          title: 'Success',
          description: 'Box created successfully',
        });
      }
      console.log({ colors, decorations, box: { name, image, price } });
    } catch (err: any) {
      console.log({ err: err.message });
    }
  };

  return (
    <div className="p-4 rounded-lg flex flex-col gap-3">
      <Toaster />
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Boxes</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Tambah Box</Button>
          </DialogTrigger>
          <DialogContent className="min-w-[800px] py-10">
            <DialogHeader>
              <DialogTitle>Tambah box</DialogTitle>
            </DialogHeader>
            <AddBox
              handleAddProduct={handleAddProduct}
              colors={colors}
              decorations={decorations}
              setColors={setColors}
              setDecorations={setDecorations}
            />
          </DialogContent>
        </Dialog>
      </header>
      <div className="grid grid-cols-3 gap-3">
        <DashboardCard
          title="Total Box"
          value={total}
          description={`Total Box`}
        />
        <DashboardCard
          title="Total Box"
          value={total}
          description={`Total Box`}
        />
        <DashboardCard
          title="Total Box"
          value={total}
          description={`Total Box`}
        />
      </div>
      <div className="bg-white rounded-xl">
        <TableComponent
          tableData={boxes.length ? boxes : []}
          tableHeader={[
            {
              as: 'Id',
              name: 'id',
            },
            {
              as: 'Name',
              name: 'name',
            },
            {
              as: 'Price',
              name: 'price',
            },
            {
              name: 'image_url',
              as: 'Image',
            },
            {
              name: 'created_at',
              as: 'Created At',
            },
            {
              name: 'updated_at',
              as: 'Updated At',
            },
            {
              name: 'action',
              as: 'Action',
            },
          ]}
          currentPage={currentPage}
          isNext={isNext}
          isPrevious={isPrevious}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default BoxPage;

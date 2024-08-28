import TableComponent from '@/components/TableComponent';
import { getBoxes } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import React, { useEffect } from 'react';
import { setBoxes } from '@/states/BoxState';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const BoxPage = () => {
  const { boxes } = useAppSelector((state) => state.box);
  const dispatch = useAppDispatch();

  const getBox = async () => {
    const responseData = await getBoxes();
    dispatch(
      setBoxes({
        boxes: responseData?.boxes?.map((box) => ({
          id: box.id,
          name: box.name,
          price: box.price,
          image_url: box.image_url,
          created_at: box.created_at,
          updated_at: box.updated_at,
          colors: box.colors || [],
          decoration: box.decoration || [],
        })),
        total: responseData.total,
        page: responseData.page,
      })
    );
  };
  useEffect(() => {
    getBox();
  }, []);

  return (
    <div className="">
      <header className="flex justify-between px-4">
        <h1 className="text-2xl font-bold">Boxes</h1>
        <div>
          <Button asChild>
            <NavLink to="add">Tambah Box</NavLink>
          </Button>
        </div>
      </header>
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
            as: 'Image Url',
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
      />
    </div>
  );
};

export default BoxPage;

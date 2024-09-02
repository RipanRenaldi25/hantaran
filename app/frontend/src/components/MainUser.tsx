import React, { useEffect, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import HeroSection from './HeroSection';
import { BoxCard } from './BoxCard';
import { Sidebar } from './UserSidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/states';
import { useToast } from './ui/use-toast';
import { ICartItem } from '@/states/interface';
import {
  decrementQuantity,
  incrementQuantity,
  setCart,
  updateSpecificCart,
} from '@/states/Cart';
import { createCart, getCartOwnedByUser } from '@/feature/cart';
import { getBoxesWithColorAndDecoration } from '@/feature/box';
import { setBoxWithColorAndDecoration } from '@/states/BoxState';
import { getUserWithProfile } from '@/feature/user';
import { setUserLoginWithProfile } from '@/states/userState';
import hero from '@/assets/hero.jpg';
import { Item } from '@radix-ui/react-navigation-menu';
import { Toaster } from './ui/toaster';

const MainUser = () => {
  const [userWithProfile, setUserWithProfile] = useState<{
    [key: string]: any;
  }>({});
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { boxes, boxesWithColorAndDecoration, page, total } = useAppSelector(
    (state) => state.box
  );
  const [tempList, setTempList] = useState<ICartItem[]>(
    JSON.parse(localStorage.getItem('CARTS')!) || []
  );
  const userLogin = useAppSelector((state) => state.userLogedIn);

  const { carts } = useAppSelector((state) => state.cart);
  if (carts.length) {
    localStorage.setItem('CARTS', JSON.stringify(carts));
  }

  const handleTempList = (box: any, color: string, decoration: string) => {
    const getTotalQuantity = carts.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    if (getTotalQuantity === 10) {
      toast({
        title: 'Cart is full',
        description:
          'Please remove or checkout all items first before add new item',
        variant: 'destructive',
      });
      return;
    }
    const index = tempList.findIndex(
      (item) =>
        item.id === box.id &&
        item.color === color &&
        item.decoration === decoration
    );
    if (index !== -1) {
      setTempList((prevValue) => {
        return prevValue.map((item, i) => {
          if (i === index) {
            dispatch(
              updateSpecificCart({ ...item, quantity: item.quantity + 1 })
            );

            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      });
    } else {
      const payload = {
        ...box,
        color,
        decoration,
        quantity: 1,
      };
      setTempList((prevValue) => [...prevValue, { ...payload }]);
      dispatch(updateSpecificCart(payload));
    }
    toast({
      title: 'Item is marked to be moved to cart',
      description:
        'Please move it to cart by clicking "masukkan keranjang" button',
      variant: 'default',
    });
    setSelectedColor('');
    setSelectedDecoration('');
  };

  const getBoxWithDecorationAndColor = async () => {
    const boxesReturned = await getBoxesWithColorAndDecoration();
    dispatch(setBoxWithColorAndDecoration(boxesReturned));
  };

  const getSelfCart = async () => {
    const carts = await getCartOwnedByUser();
  };

  const getUserProfileById = async () => {
    const user = await getUserWithProfile();
    dispatch(setUserLoginWithProfile(user));
  };
  const { userLoginWithProfile } = useAppSelector((state) => state.user);

  useEffect(() => {
    Promise.all([
      getBoxWithDecorationAndColor(),
      getSelfCart(),
      getUserProfileById(),
    ]);
  }, []);

  const handleCheckout = () => {
    if (!carts.length) {
      toast({
        title: 'Failed',
        description: 'Please choose one or more item to checkout',
        variant: 'destructive',
      });
      return;
    }
  };
  console.log({ total });

  const getTotalCart = () => {
    const total = carts.reduce((acc, current) => acc + current.quantity, 0);
    return total;
  };
  const handleIncrementQuantity = (
    id: string,
    color: string,
    decoration: string
  ) => {
    const totalCart = getTotalCart();
    if (totalCart === 10) {
      toast({
        title: 'Cart is full',
        description:
          'Please remove or checkout all items first before add new item',
        variant: 'destructive',
      });
      return;
    }
    carts.map((item) => {
      if (
        item.id === id &&
        item.color === color &&
        item.decoration === decoration
      ) {
        console.log({
          id: item.id,
          color: item.color,
          decoration: item.decoration,
          quantity: item.quantity,
        });

        dispatch(incrementQuantity({ id, color, decoration }));
      }
    });
  };

  const handleDecrementQuantity = (
    id: string,
    color: string,
    decoration: string,
    quantity: number
  ) => {
    if (quantity === 0) {
      toast({
        title: 'Cant be less than 0',
        description:
          'Please remove or checkout all items first before add new item',
        variant: 'destructive',
      });
      return;
    }
    carts.map((item) => {
      if (
        item.id === id &&
        item.color === color &&
        item.decoration === decoration
      ) {
        console.log({
          id: item.id,
          color: item.color,
          decoration: item.decoration,
          quantity: item.quantity,
        });
        dispatch(decrementQuantity({ id, color, decoration }));
      }
    });
  };

  return (
    <div>
      <div className="relative bg-yellow-500">
        <Sheet>
          <div className="fixed bottom-10 right-10 text-center">
            <SheetTrigger asChild>
              <Button>
                <ShoppingCart />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="lg:min-w-[550px]">
            <SheetHeader>
              <SheetTitle className="after:block after:w-full after:h-0.5 after:bg-black after:contents-['']">
                Carts
              </SheetTitle>
            </SheetHeader>
            <div className="p-4 bg-white rounded shadow mt-4 max-h-[70vh] overflow-y-scroll">
              {carts.length > 0 ? (
                <ul>
                  {carts?.map((item) => (
                    <div
                      key={item.id}
                      className="mt-2 flex items-center justify-between px-2 py-2 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center justify-start">
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/public/${
                            (item as any).box_image_url
                          }`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {(item as any).box_name} ({item.decoration}/
                            {item.color})
                          </span>
                          <span>Rp {item.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="bg-red-500 p-0.5 text-white"
                          onClick={() =>
                            handleDecrementQuantity(
                              item.id,
                              item?.color as string,
                              item?.decoration as string,
                              item.quantity
                            )
                          }
                        >
                          <Minus />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          type="button"
                          className="bg-green-400 text-white p-0.5"
                          onClick={() =>
                            handleIncrementQuantity(
                              item.id,
                              item?.color as string,
                              item?.decoration as string
                            )
                          }
                        >
                          <Plus />
                        </button>
                      </div>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <div className="mt-7">
              <p className="text-lg font-bold">
                Total: Rp{' '}
                {carts.reduce(
                  (acc, current) => acc + current.price * current.quantity,
                  0
                )}
              </p>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <HeroSection hero={hero} />
      <div className="flex p-8 gap-10">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4 grid grid-cols-3 gap-4">
          {boxesWithColorAndDecoration.map((box) => (
            <BoxCard
              id={box.id}
              key={box.id}
              image={box.box_image_url}
              name={box.box_name}
              price={box.price}
              onAddToCart={(color: any, decoration: any) =>
                handleTempList(box, color, decoration)
              }
              selectedColor={selectedColor}
              selectedDecoration={selectedDecoration}
              setSelectedColor={setSelectedColor}
              setSelectedDecoration={setSelectedDecoration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainUser;

import { useEffect, useMemo, useState } from 'react';

import hero from '@/assets/hero.jpg';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getBoxesWithColorAndDecoration } from '@/feature/box';
import { formatCurrency } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/states';
import { setBoxWithColorAndDecoration } from '@/states/BoxState';
import {
  decrementQuantity,
  incrementQuantity,
  removeSpecificCart,
  updateSpecificCart,
} from '@/states/Cart';
import { ICartItem } from '@/states/interface';
import { Minus, Plus, ShoppingCart, TrashIcon } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BoxCard } from './BoxCard';
import HeroSection from './HeroSection';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Sidebar } from './UserSidebar';

const MainUser = () => {
  // const [userWithProfile, setUserWithProfile] = useState<{
  //   [key: string]: any;
  // }>({});

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { boxesWithColorAndDecoration } = useAppSelector((state) => state.box);
  const [tempList, setTempList] = useState<ICartItem[]>(
    JSON.parse(localStorage.getItem('CARTS')!) || []
  );

  const { carts } = useAppSelector((state) => state.cart);

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
        item.color_name === color &&
        item.decoration_name === decoration
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
        color_name: color,
        decoration_name: decoration,
        quantity: 1,
      };
      setTempList((prevValue) => [...prevValue, { ...payload }]);
      dispatch(updateSpecificCart(payload));
    }
    toast({
      title: 'Item is moved to cart',
      variant: 'default',
    });
    setSelectedColor('');
    setSelectedDecoration('');
  };

  const getBoxWithDecorationAndColor = async () => {
    const boxesReturned = await getBoxesWithColorAndDecoration();
    dispatch(setBoxWithColorAndDecoration(boxesReturned));
  };

  useEffect(() => {
    getBoxWithDecorationAndColor();
  }, []);

  const handleCheckout = () => {
    if (!carts.length || totalCart < 10) {
      toast({
        title: 'Failed',
        description: 'Please choose 10 item to checkout',
        variant: 'destructive',
      });
      return;
    }
    navigate('/user/checkout', { state: { carts } });
  };

  const getTotalCart = () => {
    const total = carts.reduce((acc, current) => acc + current.quantity, 0);
    return total;
  };
  const totalCart = useMemo(() => getTotalCart(), [carts]);

  const handleIncrementQuantity = (
    id: string,
    color: string,
    decoration: string
  ) => {
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
        item.color_name === color &&
        item.decoration_name === decoration
      ) {
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
    if (quantity <= 1) {
      dispatch(removeSpecificCart({ id, color, decoration }));
      toast({
        title: 'Item Removed',
        description: 'Item removed from cart',
      });
      return;
    }
    carts.map((item) => {
      if (
        item.id === id &&
        item.color_name === color &&
        item.decoration_name === decoration
      ) {
        dispatch(decrementQuantity({ id, color, decoration }));
      }
    });
  };
  const { userLoginWithProfile } = useAppSelector((state) => state.user);
  console.log({ userLoginWithProfile });

  return (
    <div>
      {userLoginWithProfile.username && !userLoginWithProfile.full_name ? (
        <section>
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10"></div>
          <div className="z-20 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 max-w-sm flex flex-col gap-3 rounded-lg">
            <h1>Isi profile terlebih dahulu untuk menggunakan aplikasi</h1>
            <div className="flex gap-2">
              <Button type="button" asChild className="flex-1">
                <NavLink to={`profile/${userLoginWithProfile.id}`}>
                  Isi Profile
                </NavLink>
              </Button>
              <Button
                type="button"
                asChild
                variant={'destructive'}
                className="flex-1"
                onClick={() => {
                  localStorage.removeItem('ACCESS_TOKEN');
                  localStorage.removeItem('ROLE');
                  navigate('/');
                }}
              >
                <NavLink to={`/`}>Logout</NavLink>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
      <div className="relative bg-yellow-500">
        <Sheet>
          <div className="fixed bottom-10 right-10 text-center">
            <SheetTrigger asChild>
              <Button>
                <ShoppingCart />
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent className="md:min-w-[480px] lg:min-w-[550px]">
            <SheetHeader>
              <SheetTitle className="after:block after:w-full after:h-0.5 after:bg-black after:contents-['']">
                Carts
              </SheetTitle>
            </SheetHeader>
            <div className="p-4 bg-white rounded-md shadow-md mt-4 overflow-y-scroll min-h-[70vh]">
              {carts.length > 0 ? (
                <ul>
                  {carts?.map((item) => (
                    <div
                      key={`${item.id}-${item.color_name}-${item.decoration_name}`}
                      className="mt-2 flex items-center justify-between px-2 py-2 rounded-xg bg-gray-50 relative"
                    >
                      <div className="flex items-center justify-start">
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/public/${
                            (item as any).box_image_url
                          }`}
                          alt={item.box_name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {item.box_name} ({item.decoration_name}/
                            {item.color_name})
                          </span>
                          <span>{formatCurrency(item.price)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className={`bg-red-500 p-0.5 text-white ${
                            item.quantity === 0 && 'bg-slate-300'
                          }`}
                          onClick={() =>
                            handleDecrementQuantity(
                              item.id,
                              item?.color_name as string,
                              item?.decoration_name as string,
                              item.quantity
                            )
                          }
                          disabled={item.quantity === 0}
                        >
                          <Minus />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          type="button"
                          className={`bg-green-400 text-white p-0.5 ${
                            item.quantity >= 10 ||
                            (totalCart >= 10 && 'bg-slate-300')
                          }`}
                          onClick={() =>
                            handleIncrementQuantity(
                              item.id,
                              item?.color_name as string,
                              item?.decoration_name as string
                            )
                          }
                          disabled={item.quantity >= 10 || totalCart >= 10}
                        >
                          <Plus />
                        </button>
                        <button
                          type="button"
                          className="text-red-500 p-1 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                          onClick={() =>
                            dispatch(
                              removeSpecificCart({
                                color: item.color_name as string,
                                decoration: item.decoration_name as string,
                                id: item.id,
                              })
                            )
                          }
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  Your cart is empty.
                </p>
              )}
            </div>
            <div className="mt-7">
              <p className="text-lg font-bold">
                Total:{' '}
                {formatCurrency(
                  carts.reduce(
                    (acc, current) => acc + current.price * current.quantity,
                    0
                  )
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

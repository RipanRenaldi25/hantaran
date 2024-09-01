import React, { useEffect, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import HeroSection from './HeroSection';
import { BoxCard } from './BoxCard';
import { Sidebar } from './UserSidebar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/states';
import { useToast } from './ui/use-toast';
import { ICartItem } from '@/states/interface';
import { setCartId, setOwnedCart, updateSpecificCart } from '@/states/Cart';
import { createCart, getCartOwnedByUser } from '@/feature/cart';
import { getBoxesWithColorAndDecoration } from '@/feature/box';
import { setBoxWithColorAndDecoration } from '@/states/BoxState';
import { getUserWithProfile } from '@/feature/user';
import { setUserLoginWithProfile } from '@/states/userState';
const MainUser = () => {
  const [userWithProfile, setUserWithProfile] = useState<{
    [key: string]: any;
  }>({});
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { boxes, boxesWithColorAndDecoration, page, total } = useAppSelector(
    (state) => state.box
  );
  const [tempList, setTempList] = useState<ICartItem[]>([]);
  const [isTempListMoved, setIsTempListMoved] = useState(false);
  // const [sidebarItems, setSidebarItems] = useState([
  //   { icon: LayoutDashboard, title: 'Dashboard', path: '', isActive: true },
  // ]);
  const userLogin = useAppSelector((state) => state.userLogedIn);

  const { carts } = useAppSelector((state) => state.cart);

  const handleTempList = (box: any, color: string, decoration: string) => {
    setIsTempListMoved(false);
    const getTotalQuantity = tempList.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    if (getTotalQuantity === 10) {
      toast({
        title: 'Cart is full',
        description:
          'Please move it to cart by clicking "masukkan keranjang" button before adding new items',
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
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      });
    } else {
      setTempList((prevValue) => [
        ...prevValue,
        {
          ...box,
          color,
          decoration,
          quantity: 1,
        },
      ]);
    }
    toast({
      title: 'Item is marked to be moved to cart',
      description:
        'Please move it to cart by clicking "masukkan keranjang" button',
      variant: 'default',
    });
  };
  const handleMoveTempListToCart = async () => {
    if (!tempList.length) {
      toast({
        title: 'Cannot add to cart because its empty',
        description: 'Please add some items to cart',
        variant: 'destructive',
      });
    }
    const id = `${+new Date()}`;
    dispatch(updateSpecificCart({ id, items: tempList }));
    setIsTempListMoved(true);
    const cartCreated = await createCart({
      items: tempList.map((item) => ({
        boxId: item.id,
        quantity: item.quantity,
      })),
    });
    dispatch(setCartId({ idToChange: id, id: cartCreated.id }));
    setTempList([]);
    toast({
      title: 'Added to cart',
      description: 'Your item is added to cart',
      variant: 'default',
    });
  };

  const getBoxWithDecorationAndColor = async () => {
    const boxesReturned = await getBoxesWithColorAndDecoration();
    dispatch(setBoxWithColorAndDecoration(boxesReturned));
  };

  const getSelfCart = async () => {
    const carts = await getCartOwnedByUser();
    console.log({ ownedCart: carts });
    dispatch(setOwnedCart(carts));
  };

  const getUserProfileById = async () => {
    const user = await getUserWithProfile();
    dispatch(setUserLoginWithProfile(user));
  };
  const { userLoginWithProfile } = useAppSelector((state) => state.user);
  console.log({ userLoginWithProfile });

  useEffect(() => {
    Promise.all([
      getBoxWithDecorationAndColor(),
      getSelfCart(),
      getUserProfileById(),
    ]);
  }, []);

  return (
    <div>
      <div className="fixed bottom-10 right-10 text-center">
        <div className="flex items-center gap-5">
          <Button onClick={handleMoveTempListToCart}>
            Masukkan ke keranjang
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <ShoppingCart />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="after:block after:w-full after:h-0.5 after:bg-black after:contents-['']">
                  Carts
                </SheetTitle>
              </SheetHeader>
              <div className="p-4 bg-white rounded shadow mt-4 max-h-[70vh] overflow-y-scroll ">
                {carts.length > 0 ? (
                  <ul>
                    {carts?.map((cart) => (
                      <NavLink
                        key={cart.id}
                        className="mt-2 flex items-center hover:cursor-pointer"
                        to={`checkout/${cart.id}`}
                        state={cart}
                      >
                        {cart.items.map((item) => (
                          <>
                            <img
                              src={`${
                                import.meta.env.VITE_API_BASE_URL
                              }/public/${item.image_url}`}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <span className="font-medium">
                                {(item as any).box_name}
                              </span>
                              {' - '}
                              {item.decoration} - {item.color} - Rp
                              {item.price} - {item.quantity}
                            </div>
                          </>
                        ))}
                      </NavLink>
                    ))}
                  </ul>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <div>
                <h1>test</h1>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <HeroSection hero="asd" />
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
              isTemplistMoved={isTempListMoved}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainUser;

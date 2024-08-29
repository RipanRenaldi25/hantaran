import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import Sidebar from '@/components/Sidebar';
import { ShoppingCart } from 'lucide-react';
import hero from '@/assets/hero.jpg';
import { getBoxes, getBoxesWithColorAndDecoration } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import { setBoxes, setBoxWithColorAndDecoration } from '@/states/BoxState';
import { Button } from '@/components/ui/button';
import { setCartId, setOwnedCart, updateSpecificCart } from '@/states/Cart';
import { ICartItem } from '@/states/interface';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster } from '@/components/ui/toaster';
import { toast, useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { createCart, getCartOwnedByUser } from '@/feature/cart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserWithProfile } from '@/feature/user';
import { setUserLoginWithProfile } from '@/states/userState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Header({
  username = '',
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  console.log({ avatar });
  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <NavLink to="/profile">Profile</NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NavLink
                to=""
                onClick={() => {
                  localStorage.removeItem('ACCESS_TOKEN');
                  localStorage.removeItem('ROLE');
                }}
              >
                Logout
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="text-lg font-bold">{username || ''}</div>
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="text-gray-800 font-medium">
          HOME
        </a>
        <a href="#" className="text-gray-800">
          CART
        </a>
        <a href="#" className="text-gray-800">
          PRE ORDER
        </a>
        <a href="#" className="text-gray-800">
          ABOUT
        </a>
        <a href="#" className="text-gray-800">
          CONTACT
        </a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-white">Our New Collection</h1>
        <div className="mt-4">
          <input type="text" className="p-2 rounded-l" placeholder="Search" />
          <button className="p-2 bg-yellow-500 text-white rounded-r">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
function BoxCard({
  image,
  name,
  price,
  id,
  onAddToCart,
  isTemplistMoved = false,
}: {
  image: string;
  name: string;
  price: number;
  id: string;
  onAddToCart: any;
  isTemplistMoved: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const { boxesWithColorAndDecoration } = useAppSelector((state) => state.box);
  const handleAddToCart = () => {
    if (!selectedColor || !selectedDecoration) {
      toast({
        title: 'Error',
        description: 'Please select color and decoration!',
        variant: 'destructive',
      });
      return;
    }
    setAddedToCart(true);
    // Logika untuk menambahkan item ke keranjang bisa ditambahkan di sini
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

      {/* Pilihan warna */}
      <div className="mt-2">
        <Select
          onValueChange={(e) => setSelectedColor(e)}
          defaultValue={selectedColor}
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

      {/* Pilihan dekorasi */}
      <div className="mt-2">
        <Select
          onValueChange={(e) => setSelectedDecoration(e)}
          defaultValue={selectedDecoration}
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
        className={`mt-4 py-2 px-4 rounded ${
          addedToCart && !isTemplistMoved ? 'bg-green-500' : 'bg-yellow-700'
        } text-white`}
      >
        {addedToCart && !isTemplistMoved ? 'Added' : 'Add'}
      </button>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col space-y-4">
      <button className="bg-yellow-700 text-white py-2 px-4 rounded">
        New Collection
      </button>
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
        Special Promo
      </button>
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
        Casual Bag
      </button>
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
        Party Bag
      </button>
    </div>
  );
}

const UserDashboard = () => {
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

  if (!userLogin || !localStorage.getItem('ROLE')) {
    navigate('/');
  }

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
  console.log({ carts, tempList });
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
    console.log({ cartCreated });
    dispatch(setCartId({ idToChange: id, id: cartCreated.id }));
    setTempList([]);
    toast({
      title: 'Added to cart',
      description: 'Your item is added to cart',
      variant: 'default',
    });
  };

  const getBox = async () => {
    const boxesReturned = await getBoxes();
    dispatch(setBoxes({ boxes: boxesReturned.boxes, page, total }));
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
    if (
      localStorage.getItem('ROLE') === 'admin' ||
      userLogin.role === 'admin'
    ) {
    }
  }, []);
  return (
    <article>
      <Toaster />
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
      <Header
        username={userLoginWithProfile.username}
        avatar={userLoginWithProfile.avatar}
      />
      <HeroSection />
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
    </article>
  );
};

export default UserDashboard;

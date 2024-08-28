import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from '@/components/Sidebar';
import { LayoutDashboard } from 'lucide-react';
import hero from '@/assets/hero.jpg';
import box1 from '@/assets/box1.jpg';
import box2 from '@/assets/box2.jpg';
import box3 from '@/assets/box3.jpg';
import { getBoxes } from '@/feature/box';
import { useAppDispatch, useAppSelector } from '@/states';
import { setBoxes } from '@/states/BoxState';

function Header({ username = '' }: { username: string }) {
  return (
    <header className="bg-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-lg font-bold">{username || 'Ripan Renaldi'}</div>
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
        <h1 className="text-4xl font-bold">Our New Collection</h1>
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
  onAddToTempList,
}: {
  image: string;
  name: string;
  price: number;
  id: string;
  onAddToTempList: any;
}) {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [tempList, setTempList] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedDecoration) {
      alert('Please select color and decoration!');
      return;
    }
    setAddedToCart(true);
    // Logika untuk menambahkan item ke keranjang bisa ditambahkan di sini
  };

  const handleAddToTempList = (product, color, decoration) => {
    if (color && decoration) {
      setTempList([...tempList, { ...product, color, decoration }]);
    } else {
      alert('Please select color and decoration!');
    }
  };

  const handleAddTempListToCart = () => {
    if (tempList.length > 0) {
      setCart([...cart, tempList]);
      setTempList([]); // Reset temporary list
    } else {
      alert('Your temporary list is empty!');
    }
  };
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/public/${image}`}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 text-gray-700 font-bold">{name}</h3>
      <p className="mt-1 text-gray-500">${price}</p>

      {/* Pilihan warna */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">
          Color:
        </label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="">Select color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>

      {/* Pilihan dekorasi */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">
          Decoration:
        </label>
        <select
          value={selectedDecoration}
          onChange={(e) => setSelectedDecoration(e.target.value)}
          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="">Select decoration</option>
          <option value="plain">Plain</option>
          <option value="patterned">Patterned</option>
          <option value="textured">Textured</option>
        </select>
      </div>

      {/* Tombol untuk menambahkan ke keranjang */}
      <button
        onClick={handleAddToCart}
        className={`mt-4 py-2 px-4 rounded ${
          addedToCart ? 'bg-green-500' : 'bg-yellow-700'
        } text-white`}
      >
        {addedToCart ? 'Added' : 'Add'}
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
  const dispatch = useAppDispatch();
  const { boxes, page, total } = useAppSelector((state) => state.box);
  const [tempList, setTempList] = useState([]);
  const [cart, setCart] = useState([]);
  const [sidebarItems, setSidebarItems] = useState([
    { icon: LayoutDashboard, title: 'Dashboard', path: '', isActive: true },
  ]);
  const handleAddToCart = (product, color, decoration) => {
    if (color && decoration) {
      setCart([...cart, { ...product, color, decoration }]);
    }
  };

  const handleAddToTempList = (product, color, decoration) => {
    if (color && decoration) {
      setTempList([...tempList, { ...product, color, decoration }]);
    } else {
      alert('Please select color and decoration!');
    }
  };

  const handleAddTempListToCart = () => {
    if (tempList.length > 0) {
      setCart([...cart, tempList]);
      setTempList([]); // Reset temporary list
    } else {
      alert('Your temporary list is empty!');
    }
  };
  console.log({ tempList, cart });

  const getBox = async () => {
    const boxesReturned = await getBoxes();
    dispatch(setBoxes({ boxes: boxesReturned.boxes, page, total }));
  };

  useEffect(() => {
    getBox();
  }, []);

  return (
    <article>
      <Header username="Ripan Renaldi" />
      <HeroSection />
      <div className="flex p-8">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-3 gap-4">
            {boxes.map((box) => (
              <BoxCard
                key={box.id}
                image={box.image_url}
                name={box.name}
                price={box.price}
                onAddToTempList={(color, decoration) =>
                  handleAddToTempList(box, color, decoration)
                }
              />
            ))}
          </div>
          <button
            onClick={handleAddTempListToCart}
            className="mt-4 py-2 px-4 rounded bg-yellow-700 text-white"
          >
            Add All to Cart
          </button>
        </div>
      </div>

      {/* Display Cart */}
      <div className="mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {cart.length > 0 ? (
          cart.map((cartItems, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">Cart Group {index + 1}</h3>
              <ul>
                {cartItems.map((item, itemIndex) => (
                  <li key={itemIndex} className="mt-2">
                    {item.name} - {item.color} - {item.decoration} - $
                    {item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </article>
  );
};

export default UserDashboard;

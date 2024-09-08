import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={() => navigate('')}
        className="bg-yellow-700 text-white py-2 px-4 rounded"
      >
        New Collection
      </button>
      {/* <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
        Special Promo
      </button>
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
        Casual Bag
      </button>
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
        Party Bag
      </button> */}
    </div>
  );
}

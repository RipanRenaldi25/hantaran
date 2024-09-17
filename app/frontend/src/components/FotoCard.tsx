import { Instagram } from 'lucide-react';

export interface IFotoCard {
  name: string;
  position: string;
  image: string;
}

const FotoCard = ({ image = '', name = '', position = '' }: IFotoCard) => {
  return (
    <div className="border-4 flex flex-col border-primary border-bluethin w-full min-w-[80vw] min-h-40 md:min-w-72 md:min-h-64">
      <div className="relative h-40 md:h-full">
        <img
          src={image}
          alt={name}
          className="max-h-40 md:max-h-64 w-full object-cover object-center"
        />
        <div className="absolute right-1 top-2 bg-black text-white px-1 py-1 rounded-full md:p-2">
          <Instagram className="md:size-8" />
        </div>
      </div>
      <div className="bg-slate-100 px-2 py-3">
        <h1 className="font-semibold">{name || 'John Doe'}</h1>
        <p className="font-thin">{position || 'Member'}</p>
      </div>
    </div>
  );
};

export default FotoCard;

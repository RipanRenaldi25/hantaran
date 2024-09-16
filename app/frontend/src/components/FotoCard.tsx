import { Linkedin, ThumbsUp } from 'lucide-react';

interface IFotoCard {
  name: string;
  position: string;
  image: string;
}

const FotoCard = ({ image = '', name = '', position = '' }: IFotoCard) => {
  return (
    <div className="border-4 flex flex-col border-primary border-bluethin min-w-48 min-h-40">
      <div className="h-40 relative">
        <img
          src={image}
          alt={name}
          className="max-h-40 w-full object-cover object-center"
        />
        <div className="absolute right-1 top-2 bg-black text-white px-1 py-1 rounded-full">
          <Linkedin />
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

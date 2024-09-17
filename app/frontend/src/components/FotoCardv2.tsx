import { Instagram } from 'lucide-react';
import React from 'react';
import { IFotoCard } from './FotoCard';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';

const FotoCardv2 = ({
  image,
  name,
  position,
  description,
  instagram,
  place = 'left',
}: IFotoCard & {
  description?: string;
  instagram: string;
  place?: 'left' | 'right';
}) => {
  return (
    <div className="min-h-[300px] flex ">
      <section
        className={`h-full bg-black w-full max-w-[20vw] text-white flex flex-col justify-center items-center gap-6 font-thin ${
          place === 'left' ? '' : 'order-2'
        }`}
      >
        <h1 className="-rotate-90">{position || 'Member'}</h1>
        <div className="flex flex-col gap-2 items-center">
          <h1>Our</h1>
          <Button asChild>
            <NavLink to={instagram}>
              <Instagram className="size-5" />
            </NavLink>
          </Button>
        </div>
      </section>
      <section className="relative h-full bg-red-500 max-w-[80vw] w-[75vw]">
        <img src={image} />
        <div className="absolute bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.3)] h-[30%] flex items-center justify-center flex-col text-white">
          <h1>{name}</h1>
          <p className="text-xs">
            {description ||
              `Our loyal ${!position ? 'member' : position.toLowerCase()}`}
          </p>
        </div>
      </section>
    </div>
  );
};

export default FotoCardv2;

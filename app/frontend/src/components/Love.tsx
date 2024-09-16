import { Heart } from 'lucide-react';
import React from 'react';

const Love = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute h-[2px] w-[35vw] bg-slate-400 right-[125%]"></div>
      <Heart className="size-5" />
      <div className="absolute h-[2px] w-[35vw] bg-slate-400 left-[125%]"></div>
    </div>
  );
};

export default Love;

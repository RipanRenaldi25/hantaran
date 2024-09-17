import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel';
import { Button } from './ui/button';

interface ICarouselComponentProps {
  children: React.ReactNode;
  plugins?: any[];
}

const CarouselComponent = ({ children, plugins }: ICarouselComponentProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    setCount(api.scrollSnapList().length);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel plugins={plugins} className="mx-10" setApi={setApi}>
      <CarouselContent>{children}</CarouselContent>
      <div className="flex justify-center gap-1 mt-1 md:gap-3 md:mt-3 lg:hidden">
        {Array.from({ length: count }).map((_, i) => (
          <Button
            variant={'ghost'}
            className={`bg-slate-200 size-2 md:size-4 p-0 rounded-full overflow-hidden ${
              i + 1 === current && 'bg-slate-400'
            }`}
            onClick={() => {
              if (!api) {
                return;
              }
              api.scrollTo(i);
              setCurrent(api.selectedScrollSnap() + 1);
            }}
          ></Button>
        ))}
      </div>
      <div className="hidden lg:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;

import CarouselComponent from '@/components/CarouselComponent';
import { CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

interface IWithHero<T> {
  contents: T[];
}

const WithHero =
  (Components: typeof CarouselComponent) =>
  <T,>({ contents }: IWithHero<T>) => {
    const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
      <Components plugins={[autoplay.current]}>
        {contents.map((content: any) => (
          <CarouselItem key={content.src} className="md:basis-1/3">
            <img src={content.src} alt={content.alt} />
          </CarouselItem>
        ))}
      </Components>
    );
  };

export const CarouselWithHero = WithHero(CarouselComponent);

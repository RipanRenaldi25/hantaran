import { IFotoCard } from './FotoCard';
import FotoCardv2 from './FotoCardv2';

export interface IFotoCardListV2 {
  fotoCards: (IFotoCard & {
    instagram: string;
    description?: string;
    place?: 'left' | 'right';
  })[];
}

const FotoCardListV2 = ({ fotoCards }: IFotoCardListV2) => {
  return (
    <>
      {fotoCards.map((fotoCard) => (
        <FotoCardv2
          key={fotoCard.image}
          image={fotoCard.image}
          name={fotoCard.name}
          position={fotoCard.position}
          instagram={fotoCard.instagram}
          description={fotoCard.description}
          place={fotoCard.place ?? 'left'}
        />
      ))}
    </>
  );
};

export default FotoCardListV2;

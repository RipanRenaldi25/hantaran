import FotoCard, { IFotoCard } from './FotoCard';

export interface IFotoCardList {
  fotoCards: IFotoCard[];
}

const FotoCardList = ({ fotoCards }: IFotoCardList) => {
  return (
    <>
      {fotoCards.map((fotoCard) => (
        <FotoCard
          key={fotoCard.image}
          image={fotoCard.image}
          name={fotoCard.name}
          position={fotoCard.position}
        />
      ))}
    </>
  );
};

export default FotoCardList;

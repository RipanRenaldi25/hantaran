import React from 'react';
import collection1 from '@/assets/Koleksi Hantaran 1.jpg';
import collection2 from '@/assets/Koleksi Hantaran 2.jpg';
import collection3 from '@/assets/Koleksi Hantaran 3.jpg';
import collection4 from '@/assets/Koleksi Hantaran 4.jpg';
import collection5 from '@/assets/Koleksi Hantaran 5.jpg';
import collection6 from '@/assets/Koleksi Hantaran 6.jpg';
import collection7 from '@/assets/Koleksi Hantaran 7.jpg';
import collection8 from '@/assets/Koleksi Hantaran 8.jpg';
import collection9 from '@/assets/Koleksi Hantaran 9.jpg';
import collection10 from '@/assets/Koleksi Hantaran 10.jpg';

const CollectionPage = () => {
  return (
    <div className="collection container">
      <h1>Koleksi Hantaran Kami</h1>

      <div className="gallery">
        <div className="gallery-item">
          <img src={collection1} alt="Koleksi Hantaran 1" />
          <h3>Hantaran Eksklusif 1</h3>
        </div>
        <div className="gallery-item">
          <img src={collection2} alt="Koleksi Hantaran 1" />
          <h3>Hantaran Eksklusif 2</h3>
        </div>
        <div className="gallery-item">
          <img src={collection3} alt="Koleksi Hantaran 1" />
          <h3>Hantaran Eksklusif 3</h3>
        </div>
        <div className="gallery-item">
          <img src={collection4} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 4</h3>
        </div>
        <div className="gallery-item">
          <img src={collection5} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 5</h3>
        </div>
        <div className="gallery-item">
          <img src={collection6} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 6</h3>
        </div>
        <div className="gallery-item">
          <img src={collection7} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 7</h3>
        </div>
        <div className="gallery-item">
          <img src={collection8} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 8</h3>
        </div>
        <div className="gallery-item">
          <img src={collection9} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 9</h3>
        </div>
        <div className="gallery-item">
          <img src={collection10} alt="Koleksi Hantaran 1" />

          <h3>Hantaran Eksklusif 10</h3>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;

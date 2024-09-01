import React from 'react';

export const HeroSection = ({ hero }: { hero: string }) => {
  return (
    <div
      className="relative w-full h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold text-white">Our New Collection</h1>
        <div className="mt-4">
          <input type="text" className="p-2 rounded-l" placeholder="Search" />
          <button className="p-2 bg-yellow-500 text-white rounded-r">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

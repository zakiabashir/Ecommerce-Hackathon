'use client';

import React, { useState } from 'react';

const ShopexOffers = () => {
  const [tiltStyle, setTiltStyle] = useState({});

  const offers = [
    {
      id: 1,
      title: '24/7 Support',
      image: '/ofer1.png',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam fugit iure.',
    },
    {
      id: 2,
      title: 'Free Shipping',
      image: '/offer2.png',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam fugit iure',
    },
    {
      id: 3,
      title: 'Best Prices',
      image: '/offer3.png',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam fugit iure',
    },
    {
      id: 4,
      title: 'Secure Payments',
      image: '/offer4.png',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam fugit iure',
    },
  ];

  const handleMouseMove = (e:any) => {
    const { clientX, clientY } = e;
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) / (width / 4);
    const deltaY = (clientY - centerY) / (height / 4);

    const rotateX = deltaY * 10; // Adjust the value for tilt sensitivity
    const rotateY = -deltaX * 10; // Adjust the value for tilt sensitivity

    setTiltStyle({
      transform: `perspective(2500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out', // Smooth transition
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1500px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.1s ease-out', // Smooth transition back
    });
  };

  return (
    <div className="py-10 max-w-[1440px] mx-auto px-4 sm:px-10">
    <h2 className="text-center text-[#151875] text-5xl font-bold mb-8">
      What Shopex Offers
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="flex flex-col items-center justify-center p-6 mx-auto shadow-xl shadow-gray-300 rounded-lg h-[300px] w-full max-w-[250px] text-center bg-white"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle} // Apply the tilt effect style
        >
          <div className="w-[65px] h-[65px] mb-4">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#151875]">{offer.title}</h3>
          <p className="text-sm text-gray-500 mt-2">{offer.description}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ShopexOffers;

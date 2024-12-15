'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoMail, IoCall, IoHeartOutline, IoPersonOutline} from 'react-icons/io5';
import { FaUser, FaHeart, FaShoppingCart, FaGlobe, FaDollarSign, FaChevronDown } from 'react-icons/fa';
import CartIcon from '../Cart/CartIcon';

const TopAnnouncement = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);

  return (
    <div className="bg-[#7E33E0] text-white py-2 md:py-4  px-4 md:px-8  max-w-[1920px] mx-auto">
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-wrap gap-4 items-center ml-2 lg:ml-11 ">
          <div className="flex items-center gap-2">
            <IoMail className="text-lg" />
            <span className="text-base">mhhasanul@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <IoCall className="text-lg" />
            <span className="text-base">12345 67890</span>
          </div>
        </div>
  
        {/* Right Section */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Language Selector */}
          <div className="relative">
            <button 
              className="flex items-center gap-1"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              <span>English</span>
              <FaChevronDown className="text-xs"/>
            </button>
            {showLanguages && (
              <div className="absolute top-full mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-[120px]">
                <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">Spanish</div>
                <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">French</div>
                <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">German</div>
              </div>
            )}
          </div>
  
          {/* Currency Selector */}
          <div className="relative">
            <button 
              className="flex items-center gap-1"
              onClick={() => setShowCurrencies(!showCurrencies)}
            >
              <span>USD</span>
              <FaChevronDown className="text-xs" />
            </button>
            {showCurrencies && (
              <div className="absolute top-full mt-1 bg-white text-gray-800 rounded shadow-lg z-50 min-w-[120px]">
                <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">EUR</div>
                <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">GBP</div>
                <div className="py-1 px-3 hover:bg-gray-100 cursor-pointer">PKR</div>
              </div>
            )}
          </div>
  
          {/* Login Link */}
          <Link href="/pages/sign-in" className="flex items-center gap-1 hover:text-gray-200">
            <span>Login</span>
            <IoPersonOutline />
          </Link>
  
          {/* Wishlist Link */}
          <Link href="/pages/wishlist" className="flex items-center gap-1 hover:text-gray-200">
            <span>Wishlist</span>
            <IoHeartOutline />
          </Link>
  
          {/* Cart Link */}
          <Link href="/pages/cart/cartPage" className="flex items-center gap-1 hover:text-gray-200 ml-2">
            <CartIcon />
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default TopAnnouncement;

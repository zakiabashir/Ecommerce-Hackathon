"use client";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { increaseQuantity, decreaseQuantity } from '@/app/redux/cartSlice';

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { GiSofa } from 'react-icons/gi';
import { clearCart } from '@/app/redux/cartSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Breadcrumb from '../BreadCrumb';
import { useMediaQuery } from 'react-responsive';

// Example of CartItem type definition
interface CartItem {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  title: string;
  productImage: string;
  description: string;
  shipmentArray: any[];
  size: string;
}

const CartPage = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

  const [hydrated, setHydrated] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const totalAmount = cart.items.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    setHydrated(true); // Ensure component is hydrated
  }, []);

  const handleClick = () => {
    toast.success('Your cart is up to date, Sir!', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!hydrated) {
    return null; // Prevent rendering until hydration is complete
  }

  return (
    <>
      <Breadcrumb
        mainHeading="Shopping Cart"
        miniHeadings={['Home', 'pages', 'Shopping Cart']}
      />
      <div className="max-w-[1750px] mx-auto p-9 pb-9">
        <div className="flex flex-col lg:flex-row max-w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5">
          {/* Left Section - Cart Details */}
          <div className="w-full  min:h-[50vh] flex items-center justify-center">
  {cart.items.length === 0 ? (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
      <FaShoppingCart className="text-7xl text-gray-400 mb-4 animate-bounce" />
      <p className="text-2xl text-gray-600 dark:text-white font-bold">
        Oops! Your cart is empty. <span className="text-yellow-500">😢</span>
      </p>
      <p className="text-gray-500 text-lg">
        But don&apos;t worry, we&apos;ve got amazing things waiting for you!
        <br />
        <span className="font-semibold text-[#2F1AC4]">
          How about trying a cozy sofa? Just one purchase, and it&apos;s yours forever!
          <span className="ml-2 text-2xl text-black inline-flex items-center">
            <GiSofa />
          </span>
        </span>
      </p>
      <Link
        href="/pages/shopLeft"
        className="px-6 py-3 bg-[#2F1AC4] text-white text-lg font-bold rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 cursor-pointer hover:scale-105"
      >
        Browse Our Collection
      </Link>
    </div>
  ) : (
    <div className="p-4 mt-10 py-10 ">
      {!isSmallScreen && (
        <div className="grid grid-cols-4 gap-4 mb-4 text-center sm:text-left">
          <h2 className="text-xl font-bold text-[#151875] dark:text-white">Product</h2>
          <h4 className="text-lg font-semibold text-[#151875] sm:ml-16 xl:ml-10 dark:text-white">Price</h4>
          <h4 className="text-lg font-semibold text-[#151875] dark:text-white">Quantity</h4>
          <h4 className="text-lg font-semibold text-[#151875] dark:text-white">Total</h4>
        </div>
      )}

      {cart.items.map((item) => (
        <div
          key={item._id}
          className="border p-4 mb-4 grid grid-cols-1 sm:grid-cols-4 md:gap-4 items-center text-center sm:text-left"
        >
          <div className="flex items-center">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-20 h-20 mr-4"
            />
            <div>
              <h3 className="text-[17px] text-[#151875] dark:text-white/70 font-semibold">
                {item.productName}
              </h3>
            </div>
          </div>
          <p className="text-lg sm:ml-16 xl:ml-10">${item.price}</p>
          <div className="flex items-center justify-center sm:justify-start">
          <button onClick={() => dispatch(decreaseQuantity(item._id))} className="border px-2">–</button>
<span className="mx-2">{item.quantity}</span>
<button onClick={() => dispatch(increaseQuantity(item._id))} className="border px-2">+</button>
     </div>
          <p className="text-lg">${(item.quantity * item.price).toFixed(2)}</p>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between mt-4">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg mb-2 sm:mb-0">
          Update Cart
        </button>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )}
</div>


          {/* Right Section - Cart Summary */}
          {hydrated && cart.items.length > 0 && (
            <div className="flex flex-col lg:w-1/3 p-4 mt-10 lg:mt-0 py-10 lg:py-8 gap-16">
              {/* Cart Total */}
              <h2 className="text-2xl text-center font-semibold text-[#242896] dark:text-white/70 -mb-9 mt-8">Cart Total</h2>
              <div className="border p-4 flex flex-col gap-4 rounded-lg w-full -mb-5 bg-[#E8E6F1] dark:bg-white/10">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className='h-px w-full bg-gray-300' />
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className='h-px w-full bg-gray-300' />
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Agree to terms</span>
                </div>
                <button className="bg-green-500 text-white w-full py-2 mt-4">
                  <Link href="/pages/checkout">Checkout</Link>
                </button>
              </div>

              {/* Shipping Info */}
              <h2 className="text-xl text-center font-semibold text-[#1A0B5B] dark:text-white/70 -mb-10">Calculate Shipping</h2>
              <div className="border p-4 flex flex-col gap-4 bg-[#E8E6F1] dark:bg-white/10 rounded-lg w-full">
                <div className="flex justify-between">
                  <input type="text" placeholder='Country' className='bg-[#E8E6F1] dark:bg-[#222224] p-2 w-full' />
                </div>
                <div className='h-px w-full bg-gray-300' />
                <div className="flex justify-between">
                  <input type="text" placeholder='Address' className='bg-[#E8E6F1] dark:bg-[#222224] p-2 w-full' />
                </div>
                <div className='h-px w-full bg-gray-300' />
                <div className="flex justify-between">
                  <input type="text" placeholder='Postal Code' className='bg-[#E8E6F1] dark:bg-[#222224] p-2 w-full' />
                </div>
                <div className='h-px w-full bg-gray-300' />
                <div className="flex items-center">
                  <button className='bg-pink-500 w-full text-white px-4 py-2'>Calculate Shipping</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;

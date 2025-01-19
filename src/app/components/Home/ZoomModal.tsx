import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import AddToCartButton from '../Cart/AddToCartButton';
import WishlistButton from '../wishlist/wishListButton';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../wishlistRedux/wishlistSlice';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import { IoHeartOutline } from 'react-icons/io5';



const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-08-31'
});

const builder = imageUrlBuilder(client);

function urlFor(source : any) {
  return builder.image(source);
}

interface ImageType {
  color: string;
  imageUrl: string;
}

interface ProductType {
  _id: string;
  productName: string;
  price?: number;
  discountedPrice?: number;
  colors?: string[];
  productImage: any;
  size?: string;
}

interface ZoomModalProps {
  product: ProductType & { image: ImageType; selectedColor: string };
  onClose: () => void;
}

const ZoomModal: React.FC<ZoomModalProps> = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product.selectedColor);
  const dispatch = useDispatch();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // const handleAddToWishlist = () => {
  //   dispatch(addToWishlist({
  //     id: product._id,
  //     title: product.title,
  //     price: product.price,
  //     imageUrl: urlFor(product.images.find(img => img.color === selectedColor)?.imageUrl).url()
  //   }));
  // };

  // const selectedImage = product.images.find(img => img.color === selectedColor);

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white/90 dark:bg-[#0F0F0F] rounded-lg shadow-lg h-[70vh] w-[90vw] md:h-[50vh] md:w-[70vw] sm:w-[95vw] sm:h-auto flex flex-col sm:flex-row overflow-hidden animate-scale-up overflow-y-auto sm:overflow-auto">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-800 dark:text-white"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Left Section - Image (Top on small screens) */}
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-white/50 dark:bg-white/10">
        <img
  src={product.productImage ? urlFor(product.productImage).url() : '/cat3.png'} // Ensure you use the URL for the image
  alt={product.productName || 'Product'} // Handle missing title
  className="h-[90%] w-auto object-cover rounded-lg shadow-lg shadow-black"
/>


        </div>

        {/* Right Section - Details (Bottom on small screens) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center gap-6 bg-white/50 dark:bg-white/10">
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4 text-center">
            {product.productName || 'No title available'} {/* Handle missing title */}
          </h2>

          {/* Price Section */}
          <div className="flex flex-col items-center mb-6">
            {product.discountedPrice ? (
              <p className="text-xl font-semibold text-gray-700 dark:text-white/90">
                <span className="text-red-500 line-through mr-2">${product.price}</span>
                <span className="text-green-600">${product.discountedPrice}</span>
              </p>
            ) : (
              <p className="text-xl font-semibold text-gray-700 dark:text-white/80 ">${product.price}</p> // Handle missing discountedPrice 
            )}
          </div>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-2 mb-2 justify-center">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`px-3 py-1 rounded-full ${selectedColor === color ? 'ring-1 ring-offset-2 ring-indigo-500' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex gap-4">
            <AddToCartButton
              product={{
                ...product,
                _id: product._id,
                productName: product.productName || 'Unnamed Product', // Default name if title is missing
                price: product.price || 0, // Default price if missing
                productImage: product.productImage   || '', // Default image if missing
                colors: product.colors || [], // Default to empty array if no colors
                size: product.size || '', // Default size if missing
              }}
              showText={true}
              selectedColor={selectedColor}
            />
            {/* <button
              className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white transition-colors duration-100 ease-linear"
              onClick={handleAddToWishlist}
            >
              <IoHeartOutline size={20} className="text-[#2F1AC4] hover:text-white" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomModal;
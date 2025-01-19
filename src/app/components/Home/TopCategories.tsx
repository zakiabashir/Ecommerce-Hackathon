'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AddToCartButton from '../Cart/AddToCartButton';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  useCdn: true,
  apiVersion: '2021-08-31'
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface ProductType {
  _id: string;
  productName: string;
  productDescription: string;
  price: number;
  prevPrice: string;
  stock: number;
  productImage: any;
  tag: string;
}

const TopCategories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Update items per page based on screen width
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 2 : 4);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    // Fetch products from Sanity
    const fetchProducts = async () => {
      const query = `*[_type == "products"  && tag == "Top Categories"]{
        _id,
        productName,
        productDescription,
        price,
        prevPrice,
        stock,
        productImage,
        tag
      }`;

      const sanityProducts = await client.fetch(query);
      setProducts(
        sanityProducts.map((product: any) => ({
          ...product,
          productImage: urlFor(product.productImage),
        }))
      );
    };

    fetchProducts();
  }, []);

  const handleNavigationClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 mb-9 mt-20">
      <h2 className="text-center text-[#151875] dark:text-white text-5xl font-bold mb-8">
        Top Categories
      </h2>
      {/* Product Container */}
      <div className="flex justify-center overflow-x-auto scrollbar-hide px-4 py-4 smooth-scroll">
        {products
          .slice(activeIndex * itemsPerPage, (activeIndex + 1) * itemsPerPage)
          .map((product) => (
            <div
              key={product._id}
              className="relative mx-4 md:mx-1 flex-shrink-0 w-[50%] sm:w-[50%] md:w-[22%] md:pl-8 lg:w-[22%] group"
            >
              {/* Product Image */}
              <div className="bg-[#F6F7FB] dark:bg-[#484848] h-[70%] w-[90%] rounded-full p-6 hover:shadow-7xl hover:shadow-indigo-500 dark:hover:shadow-indigo-950/50 shadow-[-19px_26px_10px_rgba(10,0,0,0.3)] transition-shadow duration-300 overflow-hidden group-hover:relative">
                <Link href={`/topCategories/${product._id}`}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="rounded-full w-full h-auto object-cover"
                  />
                </Link>
                {/* Add to Cart Button - Visible on hover */}
                {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-14 w-20 p-3 z-[999]"> */}
                <Link href={`/topCategories/${product._id}`}>
          <button
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#08D15F] hover:rounded-md hover:bg-[#439f6b] mb-2 hover:text-white text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            View Details
          </button>
        </Link>
   
                  {/* View Details */}
                  {/* <AddToCartButton
                    product={{
                      _id: product._id,
                      productName: product.productName,
                      price: product.price,
                      productImage: product.productImage,
                      stock: product.stock,
                      
                    }}
                    showText={true}
                  /> */}
                {/* </div> */}
              </div>
              {/* Titl                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                e and Price outside the card */}
              <div className="mt-4 text-c                        enter">
                <h3 className="text-lg font-semibold text-[#151875] dark:text-white">
                  {product.productName}
                </h3>
                <p className="text-[#151875] dark:text-white/70 ">${product.price}</p>
              </div>
            </div>
          ))}
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center mt-16 space-x-2">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handleNavigationClick(index)}
              className={`w-4 h-4 rounded-full border-2 ${
                index === activeIndex
                  ? 'bg-red-500 border-red-500'
                  : 'border-red-500'
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TopCategories;

'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import Link from 'next/link';
import ZoomModal from './ZoomModal';
import AddToCartButton from '../Cart/AddToCartButton';
import WishlistButton from '../wishlist/wishListButton';

const product = [
  // Sample product data
  {
    id: 1,
    title: 'Product 1',

    // title: 'Product 2',
    image: '/s7.jpeg',
    discountedPrice: '25.00',
    price: '35.00',
    miniTitle: 'Brown Sofa',
    filter: 'New Arrival',
    slug: '1',
  },
  {
    id: 3,
    title: 'Product 3',
    image: '/s20.jpeg',
    discountedPrice: '15.00',
    price: '25.00',
    miniTitle: 'pinkish Sofa',
   filter: 'New Arrival',
   slug: '2',
  },
  {
    id: 4,
    title: 'Product 4',
    image: '/s21.jpeg',
    discountedPrice: '28.00',
    price: '18.00',
    miniTitle: 'yellowish Sofa',
 filter: 'New Arrival',
 slug: '3',
  },
  {
    id: 5,
    title: 'Product 5',
    image: '/s10.jpeg',
    price: '22.00',
    originalPrice: '32.00',
    miniTitle: 'greenish Sofa',
   filter: 'New Arrival',
   slug: '4',
  },
  {
    id: 6,
    title: 'Product 6',
    image: '/s23.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'blueish Sofa',
  filter: 'New Arrival',
  slug: '5',
  },{
    id: 7,
    title: 'Product 6',
      image: '/s12.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'greyish Sofa',
  filter: 'Best Seller',
  slug: '6',
  },{
    id: 8,
    title: 'Product 6',
      image: '/s13.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'redish Sofa',
  filter: 'Best Seller',
  slug: '7',
  },{
    id: 9,
    title: 'Product 6',
      image: '/s14.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'bluish Sofa',
  filter: 'Featured',
  slug: '8',
  },{
    id: 10,
    title: 'Product 6',
      image: '/s15.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'whitiish Sofa',
  filter: 'Featured',
  slug: '9',
  },{
    id: 11,
    title: 'Product 6',
      image: '/s16.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'brownish Sofa',
  filter: 'Best Seller',
  slug: '10',
  },
  {
    id: 12,
    title: 'Product 6',
      image: '/s17.jpeg',
    discountedPrice: '30.00',
    price: '40.00',
    miniTitle: 'bluish Sofa',
  filter: 'Special Offer',
  slug: '11',
  },
];

const filters = ['New Arrival', 'Best Seller', 'Featured', 'Special Offer'];

const LatestProduct = () => {
  // for zoom icon 
  
  const [zoomedProduct, setZoomedProduct] = useState<any>(null); // New state for zoomed product
  const handleZoomClick = (product: any) => {
    // Removed color dependency
    const imageToZoom = product.image; // Get the corresponding image
    setZoomedProduct({ ...product, image: imageToZoom }); // Set the product with the correct image
  }; 
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [filteredProducts, setFilteredProducts] = useState(product.filter(product => product.filter === activeFilter));

  const handleFilterChange = (filter:any) => {
    setActiveFilter(filter);
    setFilteredProducts(product.filter(product => product.filter === filter));
  };

  return (
    <div className="py-10 max-w-[1440px] mx-auto px-4 sm:px-10 overflow-hidden">
    <h2 className="text-center text-[#151875] dark:text-[#EAEAEA] text-5xl font-bold mb-5">Latest Products</h2>
    
    <div className="flex justify-center -space-x-4 sm:space-x-4 md:space-x-6 mb-5 ">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          className={`px-4 py-2 rounded ${activeFilter === filter ? 'text-red-500 underline underline-offset-2 dark:text-red-500' : 'text-black dark:text-white'}`}
        >
          {filter}
        </button>
      ))}
    </div>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {filteredProducts.map((product:any) => (
        <div
          key={product.id}
          className="rounded-lg shadow-md w-full h-[356px] relative overflow-hidden group" // 'group' class to handle hover effects
        >
          {/* Main Product Image */}
          <div className="w-full h-[269px] mx-auto relative bg-[#F7F7F7] dark:bg-[#484848] hover:cursor-pointer">
           <Link href={`/latestProduct/${product.slug}`}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-scale-down"
              />
              </Link>
  
            {/* Hover Icons (Bottom-Left) */}
            <div className="absolute left-4 bottom-4 hidden group-hover:flex flex-col items-center gap-4 transition duration-300">
              {/* <b/utton className="text-[#3F509E] bg-[#F7F7F7] px-2 py-2 rounded-full shadow-lg"> */}
                {/* <IoCartOutline className='w-5 h-5' /> */}

                 <div className='text-[#3F509E] bg-[#F7F7F7] px-1 py-1 hover:scale-105 rounded-full shadow-lg hover:bg-[#3F509E] hover:text-white transition-colors duration-100 ease-linear '>
                 <AddToCartButton  
    key={product.id}  
    product={{ 
      ...product, 
      id: product.id.toString(), 
      name: product.title, 
      price: product.price, 
      imageUrl: product.image, 
      // colors: 'RED (by-default)', 
      // size: 'XL (by default)' 
    }} 
    // selectedColor={selectedColors[product.id]} // Pass the selected color
    />
    </div>
              {/* </button> */}
              <div className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white text-[#2F1AC4] transition-colors duration-100 ease-linear w-10 h-10 flex justify-center items-center">
  {/* WishlistButton Component */}
  <WishlistButton
    showText={false}
    product={{
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      imageUrl: product.image,
      name: product.title,
      colors: product.colors,
      size: product.size,
    }}
      selectedColor={product.id}
  />
</div>
              <button className="text-[#3F509E] hover:text-white hover:bg-[#3F509E] hover:rounded-full hover:scale-110 transition-all duration-300 bg-transparent px-2 py-2 h-11 w-11 flex items-center justify-center">
                <FontAwesomeIcon icon={faSearch} className='w-5 h-5' onClick={() => handleZoomClick(product)} /> 
              </button>
            </div>
  
            {/* Two Images with Sale Text (Top-Left) */}
            <div className="absolute top-0 left-0 hidden group-hover:flex flex-col items-start gap-2">
              {/* First Image with Sale Text */}
              <div className="relative flex items-center">
                <img
                  src="/sale.png" // image
                  alt="Sale"
                  className="object-cover"
                />
                <span className="absolute text-white font-bold text-sm z-[999] inset-0 flex justify-center items-center -rotate-[17deg]">
                  Sale
                </span>
              </div>
            </div>
          </div>
  
          {/* Product Details */}
          <div className="p-4 py-7 flex justify-between items-center space-x-3">
            <h3 className="text-left text-lg font-semibold">{product.miniTitle}</h3>
            <div className="flex items-baseline gap-3">
              <span className="text-[#151875] dark:text-white/80 font-bold">
                ${product.discountedPrice}
              </span>
              <span className="text-[#FB2448] line-through text-sm">
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
   {/* Zoom Modal */}
   {zoomedProduct && <ZoomModal product={zoomedProduct} onClose={() => setZoomedProduct(null)} />}
  
  </div>
  );
};

export default LatestProduct;

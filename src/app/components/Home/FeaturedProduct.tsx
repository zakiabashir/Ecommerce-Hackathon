'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { AiOutlineZoomIn } from 'react-icons/ai';
import Link from 'next/link';
import ZoomModal from './ZoomModal';
import products from './DataFeatureProduct';
import AddToCartButton from '../Cart/AddToCartButton';


const FeaturedProduct = ({ product }: { product: { id: number; title: string; price: number } }) => {
  
  const [zoomedProduct, setZoomedProduct] = useState<any>(null); // New state for zoomed product
  const handleZoomClick = (product: any) => {
    const selectedColor = selectedColors[product.id]; // Get the currently selected color
    const imageToZoom = product.images[selectedColor]; // Get the corresponding image for that color
    setZoomedProduct({ ...product, image: imageToZoom, selectedColor }); // Set the product with the correct image and selected color
  };
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: product.colors[0] }), {})
  );

  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  // Scroll event listener to synchronize navigation with scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const containerWidth = scrollContainerRef.current.clientWidth;
        const maxScroll = scrollWidth - containerWidth;

        // Determine the active slide
        const newActiveSlide = Math.round((scrollLeft / maxScroll) * 3); // Assuming 4 slides
        setActiveSlide(newActiveSlide);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 px-4 max-w-[1920px] mx-auto">
    <h2 className="text-5xl font-bold text-center mb-12 text-[#1A0B5B]">Featured Products</h2>
  
    {/* Products Container */}
    <div className="relative xl:w-[1250px] mx-auto">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px] sm:min-w-[300px] snap-start group relative">
            {/* Product Image Section */}
            <div className="relative bg-[#F6F7FB] h-[300px] rounded-t-lg">
              <Image
                src={product.images[selectedColors[product.id]]}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
           <div className="absolute  left-4 top-4 flex flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
  {/* <button
    className="p-2 bg-white rounded-full hover:bg-[#fb2e86] hover:text-white transition-colors duration-100 ease-linear text-violet-500"
  > */}
    {/* <IoCartOutline size={20} className="text-[#fb2e86] hover:text-white" />
     */}
  <div className='bg-white rounded-full hover:bg-[#fb2e86] hover:text-white transition-colors duration-100 ease-linear text-violet-500 '>

   <AddToCartButton  
    key={product.id}  
    product={{ 
      ...product, 
      id: product.id.toString(), 
      name: product.title, 
      price: product.price, 
      imageUrl: product.images[selectedColors[product.id]], 
      colors: product.colors, 
      size: product.size 
    }} 
    showText={false}
    selectedColor={selectedColors[product.id]} // Pass the selected color
    
    />
    </div>

  {/* </button> */}
  <button
    className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white transition-colors duration-100 ease-linear"
  >
    <IoHeartOutline size={20} className="text-[#2F1AC4] hover:text-white" />
  </button>
  <button
    className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white transition-colors duration-100 ease-linear"
    onClick={() => handleZoomClick(product)} // Set the product for zoom
  >
    <AiOutlineZoomIn size={20} className="text-[#2F1AC4] hover:text-white" />
  </button>
</div>

              <Link href={`/featuredProduct/${product.id}`}>
              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#08D15F] hover:rounded-md hover:bg-[#439f6b] mb-2 hover:text-white text-white px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                // onClick={() => window.location.href = `/featuredProduct/${product.slug}`} // Navigate to dynamic page
              >
                View Details
              </button>
              </Link>
            </div>
            {/* Product Info Section */}
            <div className="bg-white p-4 rounded-b-lg group-hover:bg-[#2f1ac4] transition-colors text-center">
              <h3 className="text-[#FB2E86] group-hover:text-white text-lg font-medium mb-2">
                {product.title}
              </h3>
              <div className="flex gap-2 mb-2 justify-center">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(product.id, color)}
                    className={`px-3 py-1 rounded-full ${
                      selectedColors[product.id] === color ? 'ring-1 ring-offset-2 ring-indigo-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-[#2F1AC4] font-[550] group-hover:text-gray-200 mb-1">Code: {product.code}</p>
              <p className="text-[#2F1AC4] font-[550] group-hover:text-white ">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
  
      {/* Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {[0, 1, 2, 3].map((dot) => (
          <button
            key={dot}
            onClick={() => {
              if (scrollContainerRef.current) {
                const scrollWidth = scrollContainerRef.current.scrollWidth;
                const containerWidth = scrollContainerRef.current.clientWidth;
                const maxScroll = scrollWidth - containerWidth;
                const scrollPosition = (maxScroll * dot) / 3;
                scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
              }
              setActiveSlide(dot);
            }}
            className={`h-2 transition-all duration-300 rounded-lg ${
              activeSlide === dot ? 'w-20 bg-[#FB2E86]' : 'w-10 bg-gray-300'
            }`}
          />
        ))}
      </div>
        {/* Zoom Modal */}
        {zoomedProduct && <ZoomModal product={zoomedProduct} onClose={() => setZoomedProduct(null)} />}
  
  
    </div>
  </div>
  );
};

export default FeaturedProduct;

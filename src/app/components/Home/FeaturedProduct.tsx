'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { AiOutlineZoomIn } from 'react-icons/ai';
import Link from 'next/link';
import ZoomModal from './ZoomModal';
import AddToCartButton from '../Cart/AddToCartButton';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../wishlistRedux/wishlistSlice';
import WishlistButton from '../wishlist/wishListButton';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function urlFor(source: any) {
  return builder.image(source);
}

interface ImageType {
  color: string;
  imageUrl: string;
}

interface ProductType {
  _id: string;
  productName: string;
  productDescription: string;
  price: any;
  prevPrice: string;
  stock: number;
  productImage: any;
  tag: string;
  shipmentArray: {
    trackingId: string;
    deliveryStatus: string;
    estimatedDeliveryDate: string;
  }[];
}

interface ZoomedProductType extends ProductType {
  image: ImageType;
  selectedColor: string;
}

const query = `*[_type == "products"]{
  _id,
  productName,
  productDescription,
  price,
  prevPrice,
  stock,
  productImage,
  tag,
  shipmentArray[] {
    trackingId,
    deliveryStatus,
    estimatedDeliveryDate
  }
}`;

const fetchProducts = async (): Promise<ProductType[]> => {
  const data = await client.fetch(query);
  return data;
};

const FeaturedProduct = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: string }>({});
  const [zoomedProduct, setZoomedProduct] = useState<ZoomedProductType | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const addToCartButtonRef = useRef(null); // Reference for the "Add to Cart" button container

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      const filteredProducts = fetchedProducts.filter(product => String(product.productName) !== '');
      setProducts(filteredProducts);
      setSelectedColors(filteredProducts.reduce((acc, product) => ({ ...acc, [product.productName]: '' }), {}));
    };
    getProducts();
  }, []);

  const handleAddToWishlist = (product: ProductType) => {
    if (!product) return;
    dispatch(addToWishlist({
      id: product._id,
      title: product.productName,
      price: parseFloat(product.price),
      imageUrl: urlFor(product.productImage).url(),
    }));
  };

  const handleZoomClick = (product: ProductType) => {
    const selectedColor = selectedColors[product._id];
    const imageToZoom = product.productImage;
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

    if (imageToZoom) {
      setZoomedProduct({ ...product, image: imageToZoom, selectedColor, price });
    }
  };

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -scrollContainerRef.current.clientWidth : scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const containerWidth = scrollContainerRef.current.clientWidth;
        const maxScroll = scrollWidth - containerWidth;

        const newActiveSlide = Math.round((scrollLeft / maxScroll) * 3);
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

  return (
    <div className="py-16 px-4 max-w-[1920px] mx-auto">
      <h2 className="text-5xl font-bold text-center mb-12 text-[#1A0B5B] dark:text-[#EAEAEA]">Featured Products</h2>

      <div className="relative xl:w-[1250px] mx-auto">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => {
            const selectedImage = product.productImage;
            return (
              <div key={product._id} className="min-w-[250px] sm:min-w-[290px] snap-start group relative">
                <div className="relative bg-[#e6e6e8] dark:bg-[#484848] h-[300px] md:w-[] rounded-t-lg">
                  {selectedImage && (
                    <Image
                      src={urlFor(selectedImage).url()}
                      alt={product.productName}
                      fill
                      className="object-contain p-4"
                    />
                  )}

                  <div className="absolute left-4 top-4 flex flex-row gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div ref={addToCartButtonRef} className="bg-white rounded-full hover:bg-[#fb2e86] text-violet-500 hover:text-white transition-colors duration-100 ease-linear w-10 h-10 flex justify-center items-center">
                      <AddToCartButton
                        key={product._id}
                        product={{
                          _id: product._id,
                          productName: product.productName,
                          price: parseFloat(product.price),
                          productImage: urlFor(product.productImage).url(),
                          stock: product.stock,
                        }}
                        showText={false}
                        selectedColor={selectedColors[product._id]}
                      />
                    </div>

                    <div className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white text-[#2F1AC4] transition-colors duration-100 ease-linear w-10 h-10 flex justify-center items-center">
                      <WishlistButton
                        showText={false}
                        product={{
                          _id: product._id,
                          productName: product.productName,
                          price: parseFloat(product.price),
                          ProductImage: urlFor(product.productImage).url(),
                        }}
                        selectedColor={selectedColors[product._id]}
                      />
                    </div>

                    <button
                      className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white transition-colors duration-100 ease-linear w-10 h-10 flex justify-center items-center"
                      onClick={() => handleZoomClick(product)}
                    >
                      <AiOutlineZoomIn size={20} className="text-[#2F1AC4] hover:text-white" />
                    </button>
                  </div>

                  <Link href={`/featuredProduct/${product._id}`}>
                    <button
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#08D15F] hover:rounded-md hover:bg-[#439f6b] mb-2 hover:text-white text-white px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Details
                    </button>
                  </Link>
                </div>

                <div className="bg-[#FFFFFF] dark:bg-[#708090] p-4 rounded-b-lg group-hover:bg-[#2f1ac4] transition-colors text-center">
                  <h3 className="text-[#FB2E86] dark:text-[#EAEAEA] group-hover:text-white text-lg font-medium mb-1 ">
                    {product.productName}
                  </h3>
                  <p className="text-[#2F1AC4] font-[550] dark:text-[#EAEAEA] group-hover:text-gray-200 mb-0 ">
                    Code: {Array.from({ length: 1 }, () => Math.floor(Math.random() * 10000)).join(', ')}
                  </p>

                  <p className="text-[#2F1AC4] font-[550] dark:text-[#EAEAEA] group-hover:text-white ">${product.prevPrice}</p>
                </div>
              </div>
            );
          })}
        </div>

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
              className={`h-2 transition-all duration-300 rounded-lg ${activeSlide === dot ? 'w-20 bg-[#FB2E86]' : 'w-10 bg-gray-300'}`}
            />
          ))}
        </div>

        {zoomedProduct && <ZoomModal product={zoomedProduct} onClose={() => setZoomedProduct(null)} />}
      </div>
    </div>
  );
};

export default FeaturedProduct;

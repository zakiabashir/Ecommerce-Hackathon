import { FaCartPlus, FaHeart, FaSearchPlus } from 'react-icons/fa'; // Import icons from react-icons
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ZoomModal from './ZoomModal';
import AddToCartButton from '../Cart/AddToCartButton';
import WishlistButton from '../wishlist/wishListButton';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
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
  productDescription: string;
  price: any ;
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
const query = `*[_type == "products" && tag == "Trending Products"] | order(_createdAt desc)[0..3]{
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


// id: 1,
// title: 'Chair Modern',
// image: '/t1.png',
// discountedPrice: 150.0, // Use numbers for prices
// price: 200.0,
// slug: '1',
const TrendingProduct = () => {
  // const products = [
  //   {
  //     id: 1,
  //     title: 'Chair Modern',
  //     image: '/t1.png',
  //     discountedPrice: 150.0, // Use numbers for prices
  //     price: 200.0,
  //     slug: '1',
  //   },
  //   {
  //     id: 2,
  //     title: 'Chair Light',
  //     image: '/t2.png',
  //     discountedPrice: 120.0,
  //     price: 160.0,
  //     slug: '2',
  //   },
  //   {
  //     id: 3,
  //     title: 'Chair Office',
  //     image: '/t3.png',
  //     discountedPrice: 200.0,
  //     price: 250.0,
  //     slug: '3',
  //   },
  //   {
  //     id: 4,
  //     title: 'Chair Sofa',
  //     image: '/t4.png',
  //     discountedPrice: 180.0,
  //     price: 220.0,
  //     slug: '4',
  //   },
  // ];

  const [products, setProducts] = useState<ProductType[]>([]);
  // const dispatch = useDispatch();
  const [zoomedProduct, setZoomedProduct] = useState<any>(null); // New state for zoomed product
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      const filteredProducts = fetchedProducts.filter(product => String(product.productName) !== 'Minimalist Metal Chair');
      setProducts(filteredProducts);
      console.log(filteredProducts.map(product => product.productName)); // To see which products are fetched
    };
  
    getProducts();
  }, []);
  
  return (
    <div className="py-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-11">
    <h2 className="text-center text-[#151875] dark:text-white text-3xl sm:text-4xl lg:text-[42px] font-bold mb-8">Trending Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          
          className="w-full max-w-[270px] h-[360px] bg-white dark:bg-[#484848] rounded-lg shadow-lg overflow-hidden group mx-auto relative transition-transform duration-300 transform hover:scale-105"
        >
          {/* Image Section */}
          <div className="w-full h-[244px] bg-[#F5F6F8] dark:bg-[#484848] flex justify-center items-center">
            <img
              src={urlFor(product.productImage).url()}
              alt={product.productName}
              className="w-[190px] h-[190px] object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
  
          {/* Hover Icons */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex flex-col gap-4 items-center pb-20 pl-2 transition-opacity duration-300">
            <div className="w-10 h-10 p-2 bg-indigo-50 hover:bg-indigo-500 !text-white  rounded-full flex justify-center items-center transition-colors duration-300">
            <AddToCartButton
  key={product._id}
  product={{
    _id: product._id,  // Mapping the correct id field
    productName: product.productName,  // Mapping the product name
    price: parseFloat(product.price),  // Ensuring the price is a float
    productImage: urlFor(product.productImage).url(),  // Assuming you have a URL generator for the product image
    stock: product.stock,  // Mapping the stock
    // size: product.size,  // Assuming you also have the size information
    // shipmentArray: product.shipmentArray  // Including shipment details if needed
  }}
  showText={false}
  // selectedColor={selectedColors[product._id]}  // Assuming selectedColors is a dictionary of selected colors
/>
  </div>
            <div className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white text-[#2F1AC4] transition-colors duration-100 ease-linear w-10 h-10 flex justify-center items-center">
  {/* WishlistButton Component */}
  <WishlistButton
  showText={false}
  product={{
    _id: product._id,
    productName: product.productName,
    price: parseFloat(product.price),
    ProductImage: urlFor(product.productImage).url(), // Assuming `urlFor` works correctly
  }}
  // selectedColor={selectedColors[product._id]} // Make sure `selectedColors` is defined correctly
/>
</div>            <div className="w-10 h-10 p-2 text-indigo-500  dark:!text-white hover:bg-indigo-500 hover:text-white rounded-full flex justify-center items-center border-2 border-indigo-500 group-hover:border-indigo-700 group-hover:text-indigo-700 hover:scale-110 transition-all duration-300">
              <FaSearchPlus
                className="text-lg cursor-pointer"
                onClick={() => setZoomedProduct(product)}
              />
            </div>
          </div>
  
          {/* View Details Button */}
          <div className="relative flex justify-center">
            <Link href={`/trendingProduct/${product._id}`}>
              <button
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#15c662] hover:bg-purple-700 hover:text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 rounded shadow-md hover:shadow-lg"
              >
                View Details
              </button>
            </Link>
          </div>
  
          {/* Bottom Section */}
          <div className="p-4 flex flex-col justify-center items-center space-y-2 transition-all duration-300">
            <h3 className="text-[#151875] dark:text-white text-lg sm:text-xl font-semibold text-center ">
              {product.productName}
            </h3>
            <div className="flex gap-2 items-center">
              <span className="text-[#151875] dark:text-white font-bold text-lg ">
                {`$${product.price}`}
              </span>
              <span className="text-gray-500 dark:text-pink-500 line-through text-sm ">
                {`$${product.prevPrice}`}
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

export default TrendingProduct;

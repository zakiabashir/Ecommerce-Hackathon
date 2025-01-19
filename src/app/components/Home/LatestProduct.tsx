import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ZoomModal from './ZoomModal';
import AddToCartButton from '../Cart/AddToCartButton';
import { createClient } from '@sanity/client';
import WishlistButton from '@/app/components/wishlist/wishListButton';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-08-31'
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return source?.url ? source.url : builder.image(source); // Ensure proper URL generation
}

const query = `*[_type == "products" && tag == "Latest Products"]{
  _id,
  productName,
  productDescription,
  price,
  prevPrice,
  stock,
  productImage,
  tag,
  slug,
  shipmentArray[] {
    trackingId,
    deliveryStatus,
    estimatedDeliveryDate
  }
}`;

const fetchProducts = async (): Promise<any[]> => {
  const data = await client.fetch(query);
  return data;
};

const filters = ['New Arrival', 'Best Seller', 'Featured', 'Special Offer'];

const LatestProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [zoomedProduct, setZoomedProduct] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };

    getProducts();
  }, []);
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  
    // Apply filter logic with specific image limits
    if (filter === 'New Arrival') {
      // Show all products for "New Arrival"
      setFilteredProducts(products.slice(0, 5));
    } else if (filter === 'Best Seller') {
      // Show 2 products for "Best Seller"
      setFilteredProducts(products.filter((product: any) => product.tag === filter).slice(0, 3));
    } else if (filter === 'Featured') {
      // Show 3 products for "Featured"
      setFilteredProducts(products.filter((product: any) => product.tag === filter).slice(0, 3));
    } else if (filter === 'Special Offer') {
      // Show 1 product for "Special Offer"
      setFilteredProducts(products.filter((product: any) => product.tag === filter).slice(0, 1));
    } else {
      // Default fallback
      setFilteredProducts(products);
    }
  };
  

  const handleZoomClick = (product: any) => {
    setZoomedProduct(product);
  };

  return (
    
    <div className='py-16  px-4 max-w-[1920px] mx-auto'>

  <h2 className="text-5xl font-bold text-center mb-12 text-[#1A0B5B] dark:text-[#EAEAEA]">Latest Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-11">

    {filteredProducts.map((product: any) => (
      <div
        key={product._id}
        className="rounded-lg  shadow-md w-full h-[380px] relative overflow-hidden group"
      >
        {/* Product Image */}
        <div className="w-full h-[280px] mx-auto relative bg-[#F7F7F7] dark:bg-[#484848] hover:cursor-pointer flex justify-center items-center">
          {product.productImage && (
            <Image
              src={urlFor(product.productImage).url() || "/b1.png"}
              alt={product.productName}
              width={200}
              height={200}
              className="object-contain"
            />
          )}
        </div>
  
        {/* Action Buttons */}
        <div className="absolute left-4 bottom-[142px] hidden group-hover:flex flex-col items-center gap-4 transition duration-300 z-10">
          <div className="text-[#3F509E] bg-[#F7F7F7] px-2 py-1 w-10 h-10 hover:scale-105 rounded-full shadow-lg hover:bg-[#3F509E] hover:text-white transition-colors duration-100 ease-linear  flex justify-center items-center">
            <AddToCartButton
              key={product._id}
              product={{
                _id: product._id,
                productName: product.productName,
                price: parseFloat(product.price),
                productImage: urlFor(product.productImage),
                stock: product.stock,
                // shipmentArray: product.shipmentArray,
              }}
              showText={false}
            />
          </div>
  
          <div className="p-2 bg-white rounded-full hover:bg-[#2F1AC4] hover:text-white text-[#2F1AC4] transition-colors duration-100 ease-linear w-10 h-10 flex justify-center items-center">
            <WishlistButton
              showText={false}
              product={{
                _id: product._id,
                productName: product.productName,
                price: parseFloat(product.price),
                ProductImage: urlFor(product.productImage),
              }}
            />
          </div>
  
          <button
            className="text-[#3F509E] dark:text-white hover:text-white hover:bg-[#3F509E] hover:rounded-full hover:scale-110 transition-all duration-300 bg-transparent px-2 py-2 h-11 w-11 flex items-center justify-center"
            onClick={() => handleZoomClick(product)}
          >
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
          </button>
        </div>
  
        {/* View Details Button */}
        <Link href={`/latestProduct/${product._id}`}>
          <button
            className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-[#08D15F] hover:rounded-md hover:bg-[#439f6b] mb-2 hover:text-white text-white px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            View Details
          </button>
        </Link>
  
        {/* Title and Price */}
        <div className="p-4 py-5 flex justify-between items-center space-x-3 bg-white dark:bg-[#282828]">
          <h3 className="text-left text-lg font-semibold truncate">
            {product.productName}
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="text-[#151875] dark:text-white/80 font-bold">
              ${product.prevPrice}
            </span>
            <span className="text-[#FB2448] line-through text-sm">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
    </div>
  
  );
};

export default LatestProduct;

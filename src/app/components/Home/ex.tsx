import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ZoomModal from './ZoomModal';
import AddToCartButton from '../Cart/AddToCartButton';
import { createClient } from '@sanity/client';
import WishlistButton from '@/app/components/wishlist/wishListButton';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';  // Import Image from next/image

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

const Ex = () => {
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
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.tag === filter));
    }
  };

  return (
    <div className="py-16 px-4 max-w-[1920px] mx-auto">
      <h2 className="text-5xl font-bold text-center mb-12 text-[#1A0B5B] dark:text-[#EAEAEA]">Latest Products</h2>

      <div className="relative xl:w-[1250px] mx-auto">
        <div className="flex overflow-x-auto gap-6">
          {filteredProducts.map((product) => {
            const selectedImage = product.productImage; // Ensure you are using the correct image field
            return (
              <div key={product._id} className="min-w-[250px] sm:min-w-[300px]">
                <div className="relative bg-[#e6e6e8] dark:bg-[#484848] h-[300px] rounded-t-lg">
                  {product.productImage && (
                    <Image
                      src={urlFor(selectedImage).url()} // Make sure urlFor generates the correct URL
                      alt={product.productName}
                      width={300} // Set a fixed width for the image
                      height={300} // Set a fixed height for the image
                      className="object-contain p-4"
                    />
                  )}
                  {/* Add your buttons and other components here */}
                </div>

                <div className="bg-[#FFFFFF] dark:bg-[#708090] p-4 rounded-b-lg">
                  <h3 className="text-[#FB2E86] dark:text-[#EAEAEA] text-lg font-medium mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-[#2F1AC4] font-[550] dark:text-[#EAEAEA]">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ex;

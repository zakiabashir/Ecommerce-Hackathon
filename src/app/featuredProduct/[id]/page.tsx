"use client";

import { useEffect, useRef, useState } from "react";
import { faArrowRight, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";
import AddToCartButton from "@/app/components/Cart/AddToCartButton";
import NavigationLinksForDynamicPages from "@/app/components/NavigationLinksForDynamicPages";
import WishlistButton from "@/app/components/wishlist/wishListButton";
import { motion } from 'framer-motion';
import Breadcrumb from "@/app/components/BreadCrumb";
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: '2021-08-31'
});

const builder = imageUrlBuilder(client);

const query = `*[_type == "products" && _id == $id][0] {
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
        
        const fetchProduct = async (id: string) => {
      
            const data = await client.fetch(query, { id });
            return data;
        };
        
        const ProductDetail = ({ params }: { params: { id: string } }) => {
    const [hoverStyle, setHoverStyle] = useState<{ backgroundPosition: string; backgroundSize?: string }>({
    backgroundPosition: "center",
    });
    
    const handleMouseMove = (e: React.MouseEvent) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setHoverStyle({
        backgroundSize: "320%", // Adjust the zoom level as needed
        backgroundPosition: `${x}% ${y}%`,
      });
    };
    const { id } = params;
    const [product, setProduct] = useState<any | null>(null);
    useEffect(() => {
        if (id) {
          const getProduct = async () => {
            const fetchedProduct = await fetchProduct(id);
            setProduct(fetchedProduct);
          };
          getProduct();
        }
      }, [id]);
    
      if (!product) return
      <div className="skeleton-container">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-paragraph"></div>
      <div className="skeleton skeleton-paragraph"></div>
    </div>
    


const variants = {
  hidden: { opacity: 0, y: -100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
};

function urlFor(source:any) {
  return builder.image(source);
}


  return (
    <>
      <Breadcrumb mainHeading="Product Details" miniHeadings={['home', 'pages', 'product details']} />
      <div className="fp max-w-[1700px] mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 py-11 max-w-6xl mx-auto shadow-lg shadow-gray-300 rounded-lg bg-[#F6F5FF] dark:bg-[#212020] dark:shadow-gray-700">
        <motion.div
  initial="hidden"
  animate="enter"
  exit="exit"
  variants={variants}
  transition={{ duration: 0.7 }}
  className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0"
>
  {/* Right Column with Main Image */}
  <div
    className="relative w-full cursor-pointer md:w-[475px] h-[350px] md:h-[487px] bg-contain bg-no-repeat rounded-md"
    style={{
      backgroundImage: product?.productImage
        ? `url(${urlFor(product.productImage).url()})`
        : "none",
      ...hoverStyle,
    }}
    onMouseMove={handleMouseMove}
    onMouseLeave={() => setHoverStyle({ backgroundPosition: "center" })}
  ></div>
</motion.div>


          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.7 }}
            className="space-y-3 mt-9 px-4 md:px-0"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-[#0c0c0c] dark:text-white">{product.productName}</h1>

            <div className="flex items-center space-x-2 text-lg">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                ))}
              </div>
              <span className="text-gray-500 dark:text-gray-200 text-sm">(22)</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-[#151875] dark:text-white">${product.price}</span>
              <span className="text-sm line-through text-[#F24E1E]">${product.prevPrice}</span>
            </div>

            <p className="text-sm text-gray-500">{product.productDescription}</p>

            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4 items-center">
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
  showText={true}
//   selectedColor={selectedColors[product._id]}  // Assuming selectedColors is a dictionary of selected colors
/>
<WishlistButton
  showText={false}
  product={{
    _id: product._id,
    productName: product.productName,
    price: parseFloat(product.price),
    ProductImage: urlFor(product.productImage).url(), // Assuming `urlFor` works correctly
  }}
//   selectedColor={selectedColors[product._id]} // Make sure `selectedColors` is defined correctly
/>
              </div>
              {/* <div
                className={`px-4 py-2 md:text-lg ${product.stock > 0 ? "text-green-600" : "text-red-800"} text-sm font-semibold`}
              >
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </div> */}
            </div>

            <p className="text-sm">
              <span className="text-[#0d0f43] dark:text-[#575ab0] text-base font-[600]">Categories:</span> Chairs, Modern
            </p>

            <p className="text-sm">
              <span className="font-[600] text-base text-[#0d0f43] dark:text-[#575ab0]">Tags:</span> Comfort, Stylish
            </p>

            <div className="space-y-1 flex items-center gap-5">
              <p className="text-base font-[600] text-[#0d0f43] dark:text-[#575ab0]">Share:</p>
              <div className="flex space-x-4">
                <button className="text-blue-500">
                  <FontAwesomeIcon icon={faFacebook} className="text-2xl hover:scale-105 hover:text-[#0d0f43]" />
                </button>
                <button className="text-red-500">
                  <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:scale-105 hover:text-[#0d0f43]" />
                </button>
                <button className="text-blue-500">
                  <FontAwesomeIcon icon={faTwitter} className="text-2xl hover:scale-105 hover:text-[#0d0f43]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        <NavigationLinksForDynamicPages />
      </div>
    </>
  );
}

export default ProductDetail
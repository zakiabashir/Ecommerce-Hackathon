// 'use client'
// import { useState } from "react";
// import  {client, urlFor } from "@/sanity/lib/client";
// interface ProductDetailsProps {
//   product: {
//     id: string;
//     title: string;
//     code: string;
//     price: number;
//     inventory: { amount: number };
//     discountedPrice?: number;
//     colors: string[];
//     images: {
//       default: { asset: { url: string } };
//       otherColors: { image: { asset: { url: string } } }[];
//     };
//     slug: { current: string };
//     size?: string[];
//   };
// }

// const fetchData = async () => {
//   const query = `*[_type == "latestProduct"] { title, images }`;
//   const products = await client.fetch(query);

//   console.log("Products:", products);

//   // Use urlFor to generate image URLs
//   const imageUrl = urlFor(products[0].images.default);
//   console.log("Image URL:", imageUrl);
// };

// fetchData();

// const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
//   // const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
//   const [mainImage, setMainImage] = useState(product.images.default.asset.url);
//   const [hoverStyle, setHoverStyle] = useState({ backgroundPosition: "center" });
//   console.log("Main image URL:", mainImage);
//   console.log("Other images:", product.images.otherColors);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const { offsetWidth, offsetHeight } = e.currentTarget;
//     // const { offsetX, offsetY } = e;
//     // const x = offsetX / offsetWidth * 100;
//     // const y = offsetY / offsetHeight * 100;
//     // setHoverStyle({ backgroundPosition: `${x}% ${y}%` });
//   };

//   return (
//     <div className="flex flex-col gap-8">
//       <div className="flex gap-8">
//         <div
//           className="relative w-full md:w-[475px] h-[350px] md:h-[487px] bg-contain bg-no-repeat rounded-md"
//           style={{
//             backgroundImage: `url(${mainImage})`,
//             ...hoverStyle,
//           }}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => setHoverStyle({ backgroundPosition: "center" })}
//         ></div>
//         <div className="flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold">{product.title}</h1>
//             <p className="text-lg text-gray-500 mt-2">{product.code}</p>
//             <p className="text-2xl font-bold mt-4">${product.price}</p>
//             {product.discountedPrice && (
//               <p className="text-lg line-through text-gray-500">
//                 ${product.discountedPrice}
//               </p>
//             )}
//           </div>
//           <div className="space-y-1 flex items-center gap-5">
//             <p className="text-sm font-medium text-[#151875] dark:text-white">Colors</p>
//             <div className="flex space-x-2">
//   {product?.colors?.map((color, index) => (
//     <button key={index} className="color-button">
//       {color}
//     </button>
//   )) || <p>No colors available</p>}
// </div>

//           </div>
//           <div
//             className={`px-4 py-2 md:text-lg ${
//               product.inventory.amount > 0
//               ? "text-green-600 contrast-200"
//               : "text-red-800"
//             } text-sm font-semibold`}
//           >
//             {product.inventory.amount > 0
//               ? `In Stock: ${product.inventory.amount}`
//               : "Out of Stock"}
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-row md:flex-col mt-6 space-x-5 md:space-x-0 md:space-y-5 mr-4 mb-4 md:mb-0">
//         <div
//           key="default"
//           onClick={() => setMainImage(product.images.default.asset.url)}
//           className={`w-24 h-24 md:w-32 md:h-32 rounded-md bg-cover bg-center cursor-pointer border ${
//             mainImage === product.images.default.asset.url ? "border-2 border-indigo-500" : "border-gray-300"
//           }`}
//           style={{
//             backgroundImage: `url(${product.images.default.asset.url})`,
//           }}
//         ></div>
//         {product.images.otherColors.map((colorImage, index) => (
//           <div
//             key={index}
//             onClick={() => setMainImage(colorImage.image.asset.url)}
//             className={`w-24 h-24 md:w-32 md:h-32 rounded-md bg-cover bg-center cursor-pointer border ${
//               mainImage === colorImage.image.asset.url ? "border-2 border-indigo-500" : "border-gray-300"
//             }`}
//             style={{
//               backgroundImage: `url(${colorImage.image.asset.url})`,
//             }}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

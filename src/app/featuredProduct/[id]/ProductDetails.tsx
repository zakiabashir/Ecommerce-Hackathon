"use client";

import { useRef, useState } from "react";
import { faArrowRight, faHeart, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";

interface ProductDetailsProps {
  product: {
    title: string;
    price: number;
    colors: string[];
    images: Record<string, string>;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [activeLink, setActiveLink] = useState("description");
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const btn3Ref = useRef(null);
  const btn4Ref = useRef(null);
  

  const scrollToSection = (ref:any) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Ensures the section aligns at the top of the container
        inline: 'start', // Aligns horizontally at the start
      });
    }
  };
    
  
  const { title, price, colors, images } = product;
  const [mainImage, setMainImage] = useState(colors[0]);
  const [hoverStyle, setHoverStyle] = useState({ backgroundPosition: "center" });
  const activeButtonClass = 'text-[#222585] underline underline-offset-4';
  const inactiveButtonClass = 'text-[#0d0f43]';
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  return (
    <div className="fp max-w-[1700px] mx-auto p-4 ">
      {/* Breadcrumb Navbar */}
      <div className="bg-[#F6F5FF] h-[286px] w-full p-9 md:pl-40 pt-16 ">
        <h2 className="text-left text-[#151875] text-5xl font-bold mb-8">
          Product Details
        </h2>
        <nav className="flex pl-4 items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 font-semibold">
            Home
          </Link>
          <span>.</span>
          <Link href="/pages" className="hover:text-gray-900 font-semibold">
            Pages
          </Link>
          <span>.</span>
          <span className="text-[#F24E1E] font-semibold">Product Details</span>
        </nav>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 py-11 max-w-6xl mx-auto shadow-lg shadow-gray-300 rounded-lg bg-[#F6F5FF]">
  
  {/* Left Section */}
  <div className="flex flex-col items-center md:flex-row md:items-start">
    {/* Mini Images - Left Section */}
    <div className="flex flex-row md:flex-col mt-6 space-x-5 md:space-x-0 md:space-y-5 mr-4 mb-4 md:mb-0">
      {colors.slice(0, 3).map((color, index) => (
        <div
          key={index}
          onClick={() => setMainImage(color)}
          className={`w-24 h-24 md:w-32 md:h-32 rounded-md bg-cover bg-center cursor-pointer border ${mainImage === color ? "" : "border-gray-300"}`}
          style={{ backgroundImage: `url(${images[color]})` }}
        ></div>
      ))}
    </div>

    {/* Main Image - Right Section */}
    <div
      className="relative w-full md:w-[375px] h-[350px] md:h-[487px] bg-cover bg-no-repeat rounded-md"
      style={{
        backgroundImage: `url(${images[mainImage]})`,
        ...hoverStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverStyle({ backgroundPosition: "center" })}
    ></div>
  </div>

  {/* Right Section */}
  <div className="space-y-3 mt-9 px-4 md:px-0">
    {/* Title */}
    <h1 className="text-2xl md:text-3xl font-bold text-[#0c0c0c]">{title}</h1>

    {/* Ratings */}
    <div className="flex items-center space-x-2 text-lg">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-500">&#9733;</span>
        ))}
      </div>
      <span className="text-gray-500 text-sm">(22)</span>
    </div>

    {/* Price */}
    <div className="flex items-center space-x-2">
      <span className="text-lg font-bold text-[#151875]">${price.toFixed(2)}</span>
      <span className="text-sm line-through text-[#F24E1E]">${(price + 10).toFixed(2)}</span>
    </div>

    {/* Colors */}
    <div className="space-y-1 flex items-center gap-5">
      <p className="text-sm font-medium text-[#151875]">Colors</p>
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`h-6 w-6 rounded-full border ${mainImage === color ? "ring-2 ring-black/70" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setMainImage(color)}
          ></button>
        ))}
      </div>
    </div>

    {/* Description */}
    <p className="text-sm text-gray-500">
      This chair is perfect for modern interiors and provides unmatched comfort.
    </p>

    {/* Add to Cart */}
    <div className="flex space-x-4 items-center">
      <button className="text-[#0d0f43] font-[600] px-4 py-2 rounded-md">Add to Cart</button>
      <button className="p-2 rounded-full">
        <FontAwesomeIcon icon={faHeart} className="text-[#151875]" />
      </button>
    </div>

    {/* Categories */}
    <p className="text-sm">
      <span className="text-[#0d0f43] text-base font-[600]">Categories:</span> Chairs, Modern
    </p>

    {/* Tags */}
    <p className="text-sm">
      <span className="font-[600] text-base text-[#0d0f43]">Tags:</span> Comfort, Stylish
    </p>

    {/* Social Share */}
    <div className="space-y-1 flex items-center gap-5">
      <p className="text-base font-[600] text-[#0d0f43]">Share:</p>
      <div className="flex space-x-4">
        <button className="text-blue-500 z-[999]">
          <FontAwesomeIcon icon={faFacebook} className="text-2xl hover:scale-105 hover:text-[#0d0f43]"/>
        </button>
        <button className="text-red-500 z-[999]">
          <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:scale-105 hover:text-[#0d0f43]"/>
        </button>
        <button className="text-blue-500 z-[999]">
          <FontAwesomeIcon icon={faTwitter} className="text-2xl hover:scale-105 hover:text-[#0d0f43]"/>
        </button>
      </div>
    </div>
  </div>
</div>





<div className="max-w-[1100px] mx-auto mt-16 p-3">
  <div className="gap-8 mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar hidden md:flex">
    {/* Navigation Links */}
    <button
      onClick={() => { setActiveLink("description"); scrollToSection(btn1Ref); }}
      className={`text-xl font-semibold ${activeLink === "description" ? "text-[#222585] underline underline-offset-4" : "text-[#0d0f43]"}`}
    >
      Description
    </button>
    <button
      onClick={() => { setActiveLink("additionalInfo"); scrollToSection(btn2Ref); }}
      className={`text-xl font-semibold ${activeLink === "additionalInfo" ? "text-[#222585] underline underline-offset-4" : "text-[#0d0f43]"}`}
    >
      Additional Info
    </button>
    <button
      onClick={() => { setActiveLink("reviews"); scrollToSection(btn3Ref); }}
      className={`text-xl font-semibold ${activeLink === "reviews" ? "text-[#222585] underline underline-offset-4" : "text-[#0d0f43]"}`}
    >
      Reviews
    </button>
    <button
      onClick={() => { setActiveLink("video"); scrollToSection(btn4Ref); }}
      className={`text-xl font-semibold ${activeLink === "video" ? "text-[#222585] underline underline-offset-4" : "text-[#0d0f43]"}`}
    >
      Video
    </button>
  </div>

  {/* Content for Each Section */}
  {activeLink === "description" && (
     <div ref={btn1Ref}>
     <h2 className="text-3xl font-bold text-[#151875] mt-6 py-3">Product Description</h2>
     <p className="mt-4 text-[17px] text-[#5155e2]">
       This chair is perfect for modern interiors and provides unmatched comfort. It is made with high-quality materials and is designed to last for many years. Whether you place it in your living room or office, it will add a touch of elegance and comfort.
     </p>
     <p className="mt-4 text-[17px] text-[#5155e2]">
    sofa is a type of furniture that is designed to provide comfort and support for people sitting on it. It typically consists of a backrest, armrests, and a seat cushion, and is often upholstered in fabric or leather. Sofas are available in a wide range of styles and designs, from traditional to modern, and can be found in various settings such as living rooms, offices, and public spaces.
     </p>
     <h3 className="mt-6 text-3xl font-semibold text-[#151875] py-3">More Details</h3>
     <p className="mt-2 text-[17px] text-[#5155e2] py-2">
       <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2"/> The product is designed for maximum comfort and support.
     </p>
     <p className="mt-2 text-[17px] text-[#5155e2] py-2">
       <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2"/> It is crafted from durable materials for long-lasting use.
     </p>
     <p className="mt-2 text-[17px] text-[#5155e2] py-2">
       <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2"/> This chair features an ergonomic design to reduce strain on the body.
     </p>
     <p className="mt-2 text-[17px] text-[#5155e2] py-2">
       <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2" /> Available in multiple colors to match your interior decor.
     </p>
     <p className="mt-2 text-[17px] text-[#5155e2] py-2">
       <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2" /> Easy to assemble with included instructions.
     </p>
   </div>
  )}

{activeLink === "additionalInfo" && (
  <div ref={btn2Ref}>
    <h2 className="text-3xl font-bold text-[#151875] mt-6 py-3">Additional Information</h2>
    <p className="mt-4 text-[17px] text-[#5155e2]">
      This product comes with a 1-year warranty. The warranty covers any manufacturing defects and malfunctions.
    </p>
    <h3 className="mt-6 text-3xl font-semibold text-[#151875] py-3">Warranty Details</h3>
    <p className="mt-2 text-[17px] text-[#5155e2] py-2">
      <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2"/> Covers repairs or replacement for defective parts.
    </p>
    <p className="mt-2 text-[17px] text-[#5155e2] py-2">
      <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2"/> Warranty is valid for 12 months from the date of purchase.
    </p>
    <p className="mt-2 text-[17px] text-[#5155e2] py-2">
      <FontAwesomeIcon icon={faArrowRight} className="text-indigo-950 text-xl mr-2"/> To claim warranty, please retain the original receipt.
    </p>
  </div>
)}

{activeLink === "reviews" && (
  <div ref={btn3Ref}>
    <h2 className="text-3xl font-bold text-[#151875] mt-6 py-3">Customer Reviews</h2>
    <p className="mt-4 text-[17px] text-[#5155e2]">Here&apos;s what our customers have to say:</p>

    {/* Reviews Grid */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Testimonial 1 */}
      <div className="p-4 border rounded-lg shadow-md">
        <p className="text-[17px] text-[#5155e2] italic">&quot;This chair is incredibly comfortable and stylish. It blends seamlessly with my living room decor!&quot;</p>
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
        </div>
        <p className="mt-2 text-[15px] text-[#5155e2]">- John Doe</p>
      </div>

      {/* Testimonial 2 */}
      <div className="p-4 border rounded-lg shadow-md">
        <p className="text-[17px] text-[#5155e2] italic">&quot;Excellent build quality and so easy to assemble. The best purchase I&apos;ve made this year!&quot;</p>
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        </div>
        <p className="mt-2 text-[15px] text-[#5155e2]">- Jane Smith</p>
      </div>

      {/* Testimonial 3 */}
      <div className="p-4 border rounded-lg shadow-md">
        <p className="text-[17px] text-[#5155e2] italic">&quot;This chair provides amazing lumbar support and helps me work comfortably for long hours.&quot;</p>
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
        </div>
        <p className="mt-2 text-[15px] text-[#5155e2]">- Michael Lee</p>
      </div>

      {/* Testimonial 4 */}
      <div className="p-4 border rounded-lg shadow-md">
        <p className="text-[17px] text-[#5155e2] italic">&quot;I was looking for something stylish and durable. This chair meets all my expectations!&quot;</p>
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        </div>
        <p className="mt-2 text-[15px] text-[#5155e2]">- Sarah White</p>
      </div>
    </div>
  </div>
)}


{activeLink === "video" && (
  <div ref={btn4Ref}>
    <h2 className="text-3xl font-bold text-[#151875] mt-6 py-3">Product Video</h2>
    <p className="mt-4 text-[17px] text-[#5155e2]">
      Watch the product video to learn more about how this chair can elevate your space.
    </p>

  
    <div className="mt-6">
  {/* Autoplay Full-Width Video */}
  <video
    className="w-full h-auto lg:h-[480px] rounded-lg"
    src="/videos/video01.mp4"
    autoPlay
    loop
    muted
    playsInline
  >
    Your browser does not support the video tag.
  </video>
</div>

<div className="mt-6">
  <video
    className="w-full h-auto lg:h-[480px] rounded-lg"
    src="/videos/video02.mp4"
    autoPlay
    loop
    muted
    playsInline
  >
    Your browser does not support the video tag.
  </video>
</div>
 </div>

)}

</div>

{/* Dots at the bottom */}
<div className="flex justify-center gap-4 mt-6 md:hidden">
  <div
    onClick={() => { setActiveLink("description"); scrollToSection(btn1Ref); }}
    className={`w-4 h-4 rounded-full cursor-pointer ${activeLink === "description" ? "bg-[#222585]" : "bg-gray-400"}`}
  />
  <div
    onClick={() => { setActiveLink("additionalInfo"); scrollToSection(btn2Ref); }}
    className={`w-4 h-4 rounded-full cursor-pointer ${activeLink === "additionalInfo" ? "bg-[#222585]" : "bg-gray-400"}`}
  />
  <div
    onClick={() => { setActiveLink("reviews"); scrollToSection(btn3Ref); }}
    className={`w-4 h-4 rounded-full cursor-pointer ${activeLink === "reviews" ? "bg-[#222585]" : "bg-gray-400"}`}
  />
  <div
    onClick={() => { setActiveLink("video"); scrollToSection(btn4Ref); }}
    className={`w-4 h-4 rounded-full cursor-pointer ${activeLink === "video" ? "bg-[#222585]" : "bg-gray-400"}`}
  />
</div>



      {/* Related Product Section */}
      <div className="mt-16 bg-[#F6F5FF] p-8 rounded-lg max-w-[1250px] mx-auto shadow-lg shadow-gray-300">
  <h3 className="text-3xl font-semibold text-[#151875] mb-6">Related Products</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1100px] mx-auto">
    {/* Related Product Item */}
    <div className="flex flex-col items-center text-center">
      <div
        className="w-[270px] h-[340px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url('/rp1.png')` }}
      ></div>
      <div className="flex items-center justify-center mt-3">
        <h4 className="text-lg font-semibold">Men Fashion</h4>
        {/* Rating */}
        <div className="flex items-center ml-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-500">
              &#9733;
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-2">(50)</span>
        </div>
      </div>
      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold text-[#151875]">$199.99</span>
        <span className="text-sm line-through text-[#F24E1E] ml-2">$229.99</span>
      </div>
    </div>

    {/* Another Related Product Item */}
    <div className="flex flex-col items-center text-center">
      <div
        className="w-[270px] h-[340px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url('/rp4.png')` }}
      ></div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <h4 className="text-lg font-semibold">Women Fashion</h4>
        {/* Rating */}
        <div className="flex items-center justify-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-500">
              &#9733;
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-2">(32)</span>
        </div>
      </div>
      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold text-[#151875]">$499.99</span>
        <span className="text-sm line-through text-[#F24E1E] ml-2">$599.99</span>
      </div>
    </div>

    {/* Related Product Item */}
    <div className="flex flex-col items-center text-center">
      <div
        className="w-[270px] h-[340px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url('/rp3.png')` }}
      ></div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <h4 className="text-lg font-semibold">Wolx Dummy Fashion</h4>
        {/* Rating */}
        <div className="flex items-center justify-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-500">
              &#9733;
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-2">(50)</span>
        </div>
      </div>
      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold text-[#151875]">$19.99</span>
        <span className="text-sm line-through text-[#F24E1E] ml-2">$22.99</span>
      </div>
    </div>

    {/* Related Product Item */}
    <div className="flex flex-col items-center text-center">
      <div
        className="w-[270px] h-[340px] bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url('/rp2.png')` }}
      ></div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <h4 className="text-lg font-semibold">Top Wall Digital Clock</h4>
        {/* Rating */}
        <div className="flex items-center justify-center mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-500">
              &#9733;
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-2">(50)</span>
        </div>
      </div>
      {/* Price */}
      <div className="mt-2">
        <span className="text-lg font-bold text-[#151875]">$19.99</span>
        <span className="text-sm line-through text-[#F24E1E] ml-2">$22.99</span>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

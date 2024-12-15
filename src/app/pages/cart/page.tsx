'use client';
import Link from 'next/link';
import { useState } from 'react';

// const products = [
//   {
//     id: 1,
//     name: 'Ut diam consequat',
//     description: 'Color: Brown',
//     size: 'Size:XL',
//     price: 32.00,
//     imageUrl: '/s1.jpeg',
//   },
//   {
//     id: 2,
//     name: 'Vel foucibus posuere',
//     description: 'Color: Brown',
//     size: 'Size:XL',
//     price: 32.00,
//     imageUrl: '/s2.jpeg',
//   },
//   {
//     id: 3,
//     name: 'Sed tincidunt',
//     description: 'Color: Blue',
//     size: 'Size:L',
//     price: 45.00,
//     imageUrl: '/s3.jpeg',
//   },
//   {
//     id: 4,
//     name: 'Mens T-shirt',
//     description: 'Color: Blue',
//     size: 'Size:L',
//     price: 45.00,
//     imageUrl: '/s4.jpeg',
//   },
//   {
//     id: 5,
//     name: 'Mens Jeans',
//     description: 'Color: Blue',
//     size: 'Size:L',
//     price: 45.00,
//     imageUrl: '/s5.jpeg',
//   },
// ];

const AddToCartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([
    { id: 1, name: 'branded sofa', price: 150, quantity: 1, imageUrl: '/s1.jpeg', description: 'A great product', size: 'xl' },
    { id: 2, name: 'demanded chair', price: 50, quantity: 1, imageUrl: '/s9.jpeg', description: 'A great product', size: 'M' },
    { id: 3, name: 'valuable chair', price: 780, quantity: 1, imageUrl: '/s11.jpeg', description: 'A great product', size: 'L' },
    { id: 4, name: 'expensive chair', price: 3600, quantity: 1, imageUrl: '/s19.jpeg', description: 'Another great product', size: 'xl' },
  ]);
  const totalAmount = products.reduce((acc, product) => acc + product.price * quantity, 0);
  
  // Increase the quantity for the specific product
  const increaseQuantity = (productId:any) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };
  
  // Decrease the quantity for the specific product
  const decreaseQuantity = (productId:any) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  
  return (
    <>
      {/* Breadcrumb Navbar */}
      <div className="bg-[#F6F5FF] h-[286px] max-w-[1750px] mx-auto p-9 lg:pl-52 pt-16 ">
        <h2 className="text-left text-[#151875] text-5xl font-bold mb-8">
          Shopping Cart
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
          <span className="text-[#F24E1E] font-semibold">Shopping Cart</span>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row max-w-full mx-auto px-4 sm:px-6 lg:px-8">

{/* Product List Section */}
<div className="w-full md:w-2/3 p-4 mt-20 py-20">
  <div className="grid grid-cols-4 gap-4 mb-4 ml-3 text-center sm:text-left">
    <h2 className="text-xl font-bold text-[#151875]">Product</h2>
    <h4 className="text-lg font-semibold text-[#151875]">Price</h4>
    <h4 className="text-lg font-semibold text-[#151875]">Quantity</h4>
    <h4 className="text-lg font-semibold text-[#151875]">Total</h4>
  </div>

  {products.map(product => (
    <div key={product.id} className="border p-4 mb-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
      <div className="flex items-center">
        <img src={product.imageUrl} alt={product.name} className="w-20 h-20 mr-4" />
        <div>
          <h3 className="text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-600">Size: {product.size}</p>
        </div>
      </div>

      <p className="text-lg">${product.price.toFixed(2)}</p>

      <div className="flex items-center">
        <button onClick={() => decreaseQuantity(product.id)} className="border px-2">-</button>
        <span className="mx-2">{product.quantity}</span>
        <button onClick={() => increaseQuantity(product.id)} className="border px-2">+</button>
      </div>

      <p className="text-lg">${(product.quantity * product.price).toFixed(2)}</p>
    </div>
  ))}

  <div className="flex justify-between mt-4">
    <button className="bg-pink-500 text-white px-4 py-2">Add to Cart</button>
    <button className="bg-pink-500 text-white px-4 py-2">Continue Shopping</button>
  </div>
</div>

{/* Right Side Cart Section (Two Cards) */}
<div className="flex flex-col md:w-1/3 p-4 mt-36 py-20 gap-16">
  
  {/* First Cart Card */}
    <h2 className="text-2xl text-center font-semibold text-[#242896]">Cart Total</h2>
  <div className="border p-4 flex flex-col gap-4 bg-[#FFF] rounded-lg w-full">
    <div className="flex justify-between">
      <span>Subtotal:</span>
      <span>${totalAmount.toFixed(2)}</span>
    </div>
    <div className='h-px w-full bg-gray-300'/>
    <div className="flex justify-between">
      <span>Total:</span>
      <span>${totalAmount.toFixed(2)}</span>
    </div>
    <div className='h-px w-full bg-gray-300'/>
    <div className="flex items-center">
      <input type="checkbox" className="mr-2" />
      <span>Agree to terms</span>
    </div>
    <button className="bg-green-500 text-white w-full py-2 mt-4">
      <Link href="/pages/checkout">Checkout</Link>
    </button>
  </div>

  {/* Second Cart Card */}
  <div className="border p-4 flex flex-col gap-4 bg-gray-100 rounded-lg w-full">
    <h2 className="text-xl text-center font-semibold text-[#1A0B5B]">Shipping Information</h2>
    <div className="flex justify-between">
      <input type="text" placeholder='Bangladesh' className='bg-gray-100 p-2 w-full'/>
    </div>
    <div className='h-px w-full bg-gray-300'/>
    <div className="flex justify-between">
      <input type="text" placeholder='Major Area 1200' className='bg-gray-100 p-2 w-full'/>
    </div>    
    <div className='h-px w-full bg-gray-300'/>
    <div className="flex justify-between">
      <input type="text" placeholder='Postal Code' className='bg-gray-100 p-2 w-full'/>
    </div>
    <div className='h-px w-full bg-gray-300'/>
    <div className="flex items-center">
      <button className='bg-pink-500 w-full text-white px-4 py-2'>Calculate Shipping</button>
    </div>
  </div>
</div>
</div>



    </>
  );
};

export default AddToCartPage;

import Link from 'next/link';
import React from 'react';
import Breadcrumb from '../components/BreadCrumb';

const Contact = () => {
  return (
    <>
          {/* Breadcrumb Section */}
      
        <Breadcrumb
        mainHeading="Contact us"
        miniHeadings={['Home', 'pages', 'Contact us']}
      />
        <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-20">

        {/* Left Section */}
        <div className="max-w-lg mx-auto text-center p-4 md:p-8">
  <h2 className="text-3xl font-bold mb-4 text-[#151875]">Information About us</h2>
  <p className="text-gray-600 mb-6">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget ultrices
    lorem, vitae aliquam dolor. Maecenas euismod libero vitae libero volutpat vitae
    eget odio interdum. Donec non facilisis libero, vitae lobortis felis. Quisque quam.
  </p>
  <div className="flex justify-center gap-2">
    <div className="w-6 h-6 rounded-full bg-purple-500"></div>
    <div className="w-6 h-6 rounded-full bg-pink-500"></div>
    <div className="w-6 h-6 rounded-full bg-cyan-500"></div>
  </div>
</div>


        {/* Right Section */}
        <div className="max-w-lg mx-auto text-center p-4 md:text-left md:p-8">
  <h2 className="text-3xl font-bold mb-6 text-[#151875]">Contact Way</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 rounded-full bg-purple-500"></div>
      <p className="text-gray-600">Tel: 8766 53 88 99</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 rounded-full bg-pink-500"></div>
      <p className="text-gray-600">Support forum for over</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 rounded-full bg-orange-500"></div>
      <p className="text-gray-600">20 Margaret Street, London</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 rounded-full bg-green-500"></div>
      <p className="text-gray-600">Free standard shipping</p>
    </div>
  </div>
</div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-6xl mx-auto">
        {/* Left Side */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#151875]">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions, feel free to reach out to us!
          </p>
          <div className="flex gap-4 mb-4">
            <input type="text" placeholder="First Name" className="border border-[#151875] rounded p-2 flex-1" />
            <input type="text" placeholder="Last Name" className="border border-[#151875] rounded p-2 flex-1" />
          </div>
          <input type="email" placeholder="Email" className="border border-[#151875] rounded p-2 mb-4 w-full" />
          <textarea placeholder="Your Message" className="border border-[#151875] rounded p-2 mb-4 w-full h-32"></textarea>
          <button className="bg-[#F24E1E] text-white rounded p-2 px-5 py-3">Send Mail</button>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center">
          <img src="/contact.png" alt="Contact" className="w-[500px] h-[500px] " />
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
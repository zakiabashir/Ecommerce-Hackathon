'use client'
import Link from 'next/link'; 
import { useState } from 'react';

const About = ({ offers }: { offers: any }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      {/* Breadcrumb Navbar */}
      <div className="bg-[#F6F5FF] h-[286px] w-full p-9 max-w-[1500px] pl-20 mx-auto">
        <h2 className="text-left text-[#151875] text-5xl font-bold mb-8">
         About Us
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
          <span className="text-[#F24E1E] font-semibold">About Us</span>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start py-11 max-w-[1200px] mx-auto px-4 lg:px-0">
  {/* Left Section - Image */}
  <div className="flex-1 flex mt-7 lg:mt-0 justify-center lg:justify-end">
    <img
      src="/about.png"
      alt="About Us"
      className="w-full max-w-[400px] md:max-w-[500px] shadow-xl shadow-[#151875]"
    />
  </div>

  {/* Right Section - Text Content */}
  <div className="flex-1 text-center lg:text-left mt-8 lg:mt-0 lg:ml-8">
    <h3 className="text-2xl md:text-3xl font-bold text-[#151875] capitalize">
      Know about our e-commerce business, history
    </h3>
    <p className="mt-4 text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Quisquam, quos.
    </p>
    <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-[#D43E1B]">
      Learn More
    </button>
  </div>
</div>


      {/* Offers Section */}
      <h2 className="text-center capitalize text-[#151875] mt-20 text-5xl font-bold mb-8">
      our features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-11 rounded-lg max-w-[1100px] mx-auto">
        {offers.map((offer: any) => (
          <div
            key={offer.id}
            className="flex flex-col items-center justify-center p-6 mx-auto shadow-xl shadow-gray-300 rounded-lg h-[300px] w-[250px] text-center bg-white"
                  >
            <div className="w-[65px] h-[65px] mb-4">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-[#151875]">{offer.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{offer.description}</p>
          </div>
        ))}
      </div>

    <div>
      {/* Client Testimonials Section */}
      <div className="text-center mt-10 py-11">
        <h3 className="text-3xl font-extrabold text-[#151875]">Our Clients Say</h3>
        <div className="flex justify-center mt-5">
          <img
            src="/tes3.png"
            alt="Client 1"
            className={`w-16 h-16 ${selectedImage === 0 ? 'border-2 scale-125 ease-in-out duration-300' : ''}`}
            onClick={() => setSelectedImage(0)}
          />
          <img
            src="/tes1.png"
            alt="Client 2"
            className={`w-16 h-16 mx-4 ${selectedImage === 1 ? 'border-2 scale-125 ease-in-out duration-300' : ''}`}
            onClick={() => setSelectedImage(1)}
          />
          <img
            src="/tes2.png"
            alt="Client 3"
            className={`w-16 h-16 ${selectedImage === 2 ? 'border-2 scale-125 ease-in-out duration-300' : ''}`}
            onClick={() => setSelectedImage(2)}
          />
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">
            {selectedImage === 0 ? 'John Doe' : selectedImage === 1 ? 'Selena Gomez' : 'Alice Johnson'}
          </h4>
          <h5 className="text-sm text-gray-500">
            {selectedImage === 0
              ? 'CEO, Company A'
              : selectedImage === 1
              ? 'Manager, Company B'
              : 'Designer, Company C'}
          </h5>
          <p className="mt-2 text-gray-600">
            {selectedImage === 0
              ? 'This product has changed the way we do business!'
              : selectedImage === 1
              ? 'An amazing experience, highly recommend!'
              : 'Fantastic quality and support andso dgsd dusgs lorem dhsdhsjdh dshds!'}
          </p>
        </div>
      </div>

      {/* Navigation Lines */}
      <div className="flex justify-center space-x-4 px-4 py-7  ">
        <div className={`h-1 w-[2vw] ${selectedImage === 0 ? 'bg-[#F24E1E]' : 'bg-gray-300'}`}></div>
        <div className={`h-1 w-[2vw] ${selectedImage === 1 ? 'bg-[#F24E1E]' : 'bg-gray-300'}`}></div>
        <div className={`h-1 w-[2vw] ${selectedImage === 2 ? 'bg-[#F24E1E]' : 'bg-gray-300'}`}></div>
      </div>
    </div>
    </div>
  );
};

export default About;
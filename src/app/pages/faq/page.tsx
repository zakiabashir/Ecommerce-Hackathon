'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const FaqPage = () => {
  const [openAccordion, setOpenAccordion] = useState<number[]>([]);

  const handleAccordionClick = (index: number) => {
    if (openAccordion.includes(index)) {
      setOpenAccordion(openAccordion.filter((i) => i !== index));
    } else {
      setOpenAccordion([...openAccordion, index]);
    }
  };

  const questions = [
    {
      question: 'What is the return policy for products and how do I initiate a return?',
      answer: 'We offer a 30-day return policy for all items in their original condition. Please contact customer support to initiate the return process.',
    },
    {
      question: 'How do I track my order and what is the expected delivery time?',
      answer: 'Once your order is shipped, you will receive a tracking number via email to monitor the delivery progress.',
    },
    {
      question: 'Can I cancel my order after placing it and how long does it take to process a refund?',
      answer: 'Orders can be canceled within 1 hour of purchase. Please contact our customer service as soon as possible to request a cancellation.',
    },
    {
      question: 'Do you offer international shipping and what are the shipping fees and delivery times?',
      answer: 'Yes, we ship internationally. Shipping fees and delivery times will vary based on your location.',
    },
  ];
  

  return (
    <>
        {/* Breadcrumb Section */}
        <div className="bg-[#F6F5FF] h-[186px] w-full p-9 max-w-[1500px] pl-20 mx-auto">
        <h2 className="text-left text-[#151875] text-5xl font-bold mb-8">
         FAQ
        </h2>
        <nav className="flex pl-4 items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 font-semibold">
            Home
          </Link>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <Link href="/pages/shop-grid-default" className="hover:text-gray-900 font-semibold">
            Pages Grid Default
          </Link>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span className="text-[#F24E1E] font-semibold capitalize">faq</span>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row p-4 max-w-6xl mx-auto mt-20 gap-10 py-11 h-auto">

{/* General Information Section */}
<div className="w-full md:w-1/2">
  <h2 className="text-3xl font-bold mb-4 text-[#151875]">General Information</h2>
  {questions.map((item, index) => (
    <div key={index} className="mb-2 py-3">
      <button
        className="w-full text-left p-2 rounded text-[#151875]"
        onClick={() => handleAccordionClick(index)}
      >
        {item.question}
      </button>
      {openAccordion.includes(index) && (
        <div className="p-2 bg-gray-100 border-l-4 border-blue-500">
          {item.answer}
        </div>
      )}
    </div>
  ))}
</div>

{/* Ask a Question Section */}
<div className="w-full md:w-1/2 bg-gray-100 p-9 rounded-lg">
  <h2 className="text-3xl font-bold mb-4 text-[#151875] py-7">Ask a Question</h2>
  <input
    type="text"
    placeholder="Your Name*"
    className="w-full mb-2 p-2 border border-gray-300 rounded py-3"
  />
  <input
    type="email"
    placeholder="Your Email*"
    className="w-full mb-2 p-2 border border-gray-300 rounded py-3"
  />
  <input
    type="text"
    placeholder="Your Question*"
    className="w-full mb-2 p-2 border border-gray-300 rounded py-11"
  />
  <button className="w-full md:w-1/3 bg-[#151875] text-white p-2 ml-1 rounded">
    Submit
  </button>
</div>

</div>

    <div className="flex justify-center items-center max-w-[1540px] mx-auto py-11">
            <img src="/brand1.png" alt="brand1" />
        </div>
    </>
  );
};

export default FaqPage;
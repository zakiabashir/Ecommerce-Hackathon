'use client';

import Link from 'next/link';
import React from 'react';

const BlogComponent = () => {
  const blogPosts = [
    {
      id: 1,
      image: '/b1.png',
      author: 'Saber Ali',
      date: '20 Aug 2020',
      title: 'Exciting New Technologies in Web Development',
      paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod magna eu...',
    },
    {
      id: 2,
      image: '/b2.png',
      author: 'Sara Ali',
      date: '15 Sept 2020',
      title: 'How to Master Frontend Development in 2020',
      paragraph: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Integer ac...',
    },
    {
      id: 3,
      image: '/b3.png',
      author: 'Ali Hassan',
      date: '5 Oct 2020',
      title: 'The Future of AI and Machine Learning',
      paragraph: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius. Nam...',
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-11">
      <h2 className="text-5xl font-bold text-center mb-12 text-[#1A0B5B]">Latest Blog</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
            {/* Top Section (Image) */}
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
            </div>
            
            {/* Bottom Section (Author, Date, Title, Paragraph, Read More) */}
            <div className="p-4">
              {/* Author and Date */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <i className="fa fa-pencil-alt text-xs mr-1"></i> {post.author}
                </span>
                <span className="flex items-center">
                  <i className="fa fa-calendar-alt text-xs mr-1"></i> {post.date}
                </span>
              </div>
              
              {/* Blog Title */}
              <h3 className="text-xl font-semibold text-[#151875] group-hover:text-[#FB2E86] mb-2">{post.title}</h3>
              
              {/* Paragraph */}
              <p className="text-gray-600 mb-4">{post.paragraph}</p>
              
              {/* Read More Link */}
              <Link
                href="/blog"
                className="text-[#151875] hover:text-[#FB2E86] font-semibold underline group-hover:text-[#FB2E86]"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;

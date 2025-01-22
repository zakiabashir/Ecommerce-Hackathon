'use client';

import Image from 'next/image';
import { FaEnvelope, FaInstagram, FaGithub, FaLinkedin, FaHandshake } from 'react-icons/fa'; // Added icons for sections

function CreatorPage() {
  return (
    <>
     
      <div className="min-h-screen bg-[#f9f9f9] py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* About Creator Section */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/zpic.png" // Path to your image in the public folder
                alt="Zakia Bashir"
                width={150}
                height={150}
                className="rounded-full shadow-lg-[#1D3178]"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D3178] flex items-center gap-2">
                About the Creator
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
  Hi, I&apos;m <span className="font-semibold">Zakia Bashir</span>, a passionate developer driven by the endless possibilities in 
  <span className="font-semibold">Generative AI</span>, the <span className="font-semibold">Metaverse</span>, and <span className="font-semibold">Cloud Technologies</span>. 
  My expertise lies in crafting dynamic and user-centric web solutions, always pushing the boundaries of innovation.
</p>
<p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
  Outside of coding, I love exploring emerging technologies, brainstorming groundbreaking ideas, and collaborating with inspiring minds to bring transformative projects to life.
</p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200"></div>

          {/* Feel Free to Knock Section */}
          <div className="bg-[#FEE5E5] sm:bg-[#EDEFFB] p-6 rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#FB2E86] flex items-center justify-center gap-2">
              Feel Free to <span className="text-[#1D3178]">Knock</span> <FaHandshake className="text-[#FB2E86]" />
            </h2>
            <div className="mt-6 flex justify-center space-x-8 text-center text-2xl text-[#1D3178]">
              {/* Gmail */}
              <a
                href="mailto:nshafeys0@gmail.com"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEnvelope />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/zakiabashir"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/zakia-bashir-367b41254/"
                className="hover:text-[#FB2E86] transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default CreatorPage;

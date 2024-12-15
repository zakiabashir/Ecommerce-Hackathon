// components/scroll to top.tsx
'use client';
import { FiArrowUp } from 'react-icons/fi';

const Services = () => {
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    
    // If we're already at the top, no need to continue
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 29);
    }
  };

  return (
    <>
      

      {/* Scroll to top button */}
      <button
  onClick={scrollToTop}
  className="fixed bottom-8 right-8 bg-[#1A0B5B] hover:bg-[#fb2e86] opacity-100 text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-700 z-[999]"
>
  <FiArrowUp size={24} />
</button>
    </>
  );
};

export default Services;

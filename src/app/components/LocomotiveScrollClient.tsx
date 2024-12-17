'use client';
import { useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";

const LocomotiveScrollClient = () => {
  const [isSmooth, setIsSmooth] = useState(true);

  // Function to debounce resizing events for smoother transitions
  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Handle window resize events with a debounce to avoid unnecessary re-renders
  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth < 1024) {
        setIsSmooth(false); // Disable smooth scroll on smaller screens (e.g. tablets)
      } else {
        setIsSmooth(true); // Enable smooth scroll on larger screens
      }
    }, 100); // Debounce delay set to 100ms for a smoother experience

    // Initial resize check
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener on unmount
    };
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");

    if (!scrollContainer) return; // Ensure the container exists

    // Initialize Locomotive Scroll with smooth scrolling conditionally
    const scroll = new LocomotiveScroll({
      el: scrollContainer as HTMLElement, // Type assertion to ensure it's an HTMLElement
      smooth: isSmooth,
      getDirection: true, // Enable this option to detect scroll direction
    });

    // Clean up scroll instance on unmount
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, [isSmooth]); // Re-run the effect when `isSmooth` state changes

  return null; // Nothing to render, just initializing the scroll
};

export default LocomotiveScrollClient;

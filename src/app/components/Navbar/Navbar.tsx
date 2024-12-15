'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown, FiMenu, FiSearch, FiX } from "react-icons/fi";

export default function Navbar() {
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleHomeDropdown = () => setShowHomeDropdown(!showHomeDropdown);
  const closeHomeDropdown = () => setShowHomeDropdown(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (showHomeDropdown || isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [showHomeDropdown, isMenuOpen]);

  const links = [
    { href: "/", label: "Home", dropdown: true },
    { href: "/pages", label: "Pages" },
    { href: "/pages/shopList", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/pages/shopLeft", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md  xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-between items-center h-16 max-w-[1177px] mx-auto">
        {/* Logo Section */}
        <div>
          <Link href="/" className="font-bold text-xl tracking-tight">
            <h1 className="text-black text-2xl font-bold">HEKTO</h1>
          </Link>
        </div>

        {/* Links for Larger Screens */}
        <div className="hidden lg:flex items-center">
          {links.map((link, index) =>
            link.dropdown ? (
              <div key={index} className="relative">
                <button
                  className="text-[#0D0E43] hover:text-[#fb2e86] px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                  onClick={toggleHomeDropdown}
                >
                  {link.label}
                  <FiChevronDown
                    className={`transition-transform ${
                      showHomeDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showHomeDropdown && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#e0e0e2] ring-1 ring-black ring-opacity-5">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Home Page
                    </Link>
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      About Us
                    </Link>
                    <Link
                      href="/pages/sign-up"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/pages/sign-in"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Sign In
                    </Link>
                    {/* <Link
                      href="/pages/cart"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Cart
                    </Link>
                    <Link
                      href="/pages/checkout"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Checkout
                    </Link> */}
                    <Link
                      href="/pages/faq"
                      className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/pages/shop-grid-default"
                        className="block px-4 py-2 text-sm text-[#0D0E43] hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Shop Grid Default
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-[#fb2e86] px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Search and Hamburger Menu */}
        <div className="flex items-center">
          <div className="hidden lg:flex relative cursor-pointer">
            <input
              type="text"
              className="px-6 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fb2e86] text-[#0D0E43] text-base"
              placeholder="..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center bg-[#fb2e86] text-white px-3 rounded-r-md hover:bg-[#e90b6b] cursor-pointer">
            <FiSearch />
            </div>
          </div>
          <button
            className="lg:hidden ml-4 text-gray-500 hover:text-[#fb2e86]"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-2 space-y-2">
            {links.map((link, index) =>
              link.dropdown ? (
                <div key={index} className="relative">
                  <button
                    className="text-gray-500 hover:text-[#fb2e86] w-full text-left px-3 py-2 rounded-md text-lg font-medium flex items-center gap-1"
                    onClick={toggleHomeDropdown}
                  >
                    {link.label}
                    <FiChevronDown
                      className={`transition-transform ${
                        showHomeDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {showHomeDropdown && (
                    <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg py-1 bg-[#e0e0e2] ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeHomeDropdown}
                      >
                        Home Page
                      </Link>
                      <Link
                        href="/about"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeHomeDropdown}
                      >
                        About Us
                      </Link>
                      <Link
                      href="/pages/sign-up"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/pages/sign-in"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Sign In
                    </Link>
                    {/* <Link
                      href="/pages/cart"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Cart
                    </Link>
                    <Link
                      href="/pages/checkout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Checkout
                    </Link> */}
                    <Link
                      href="/pages/faq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/pages/shop-grid-default"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeHomeDropdown}
                    >
                      Shop Grid Default
                    </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-gray-500 hover:text-[#fb2e86] px-3 py-2 rounded-md text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div className="px-4 py-2 flex items-center gap-2">
            <input
              type="text"
              className="px-6 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
             <button className="bg-[#fb2e86] text-white px-6 py-2 rounded-md">search</button>
          </div>
        </div>
      )}
    </nav>
  );
}

import Breadcrumb from "@/app/components/BreadCrumb";
import Brands from "@/app/components/Home/brands";
import Link from "next/link";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <>
  
  <Breadcrumb
        mainHeading="Create an Account"
        miniHeadings={['Home', 'pages', 'Create an Account']}
      />

    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0F0F0F]">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md shadow-black dark:shadow-gray-800 dark:bg-[#1a1a1a]">
        {/* Main Heading */}
        <h1 className="text-2xl font-extrabold font-weight-bold text-center text-black dark:text-white">SIGN UP</h1>
        
        {/* Mini Paragraph */}
        <p className="mt-2 text-sm text-center text-gray-500 dark:text-white/80">
          Create an account to continue.
        </p>

        {/* Inputs */}
        <form className="mt-6 space-y-4">
        <input
            type="name"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />  <input
          type="phone"
            placeholder="Phone number"
          className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />

          {/* Forgot Password */}
          <p className="text-sm text-left text-gray-500 cursor-pointer hover:text-gray-700 dark:text-white/80">
            Forgot Password?
          </p>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-white/80">
          Already have an account?{" "}
          <Link href="/pages/login" className="hover:text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
   <Brands/>
    </>
  );
};

export default SignUpPage;

import Breadcrumb from "@/app/components/BreadCrumb";
import Link from "next/link";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <>
  
  <Breadcrumb
        mainHeading="My Account"
        miniHeadings={['Home', 'pages', 'My Account']}
      />

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6  rounded-lg shadow-md shadow-black">
        {/* Main Heading */}
        <h1 className="text-2xl font-extrabold font-weight-bold text-center text-black ">LOGIN</h1>
        
        {/* Mini Paragraph */}
        <p className="mt-2 text-sm text-center text-gray-500">
          Log in to your account to continue.
        </p>

        {/* Inputs */}
        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email  Address"
            className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />

          {/* Forgot Password */}
          <p className="text-sm text-left text-gray-500 cursor-pointer hover:text-gray-700">
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
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/pages/sign-up" className="hover:text-pink-500 hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
    <div className="flex justify-center items-center max-w-[1540px] mx-auto py-11">
            <img src="/brand1.png" alt="brand1" />
        </div>
    </>
  );
};

export default LoginPage;

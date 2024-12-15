import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div>
      {/* Breadcrumb Section */}
      <div className="bg-[#F6F5FF] h-[186px] w-full p-9 max-w-[1500px] pl-20 mx-auto">
        <h2 className="text-left text-[#151875] text-5xl font-bold mb-8">
          404 Error
        </h2>
        <nav className="flex pl-4 items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 font-semibold">
            Home
          </Link>
          <span>.</span>
          <Link href="/pages" className="hover:text-gray-900 font-semibold">
            pages
          </Link>
          <span>.</span>
          <span className="text-[#F24E1E] font-semibold capitalize">404 Error</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center max-w-[1500px] mx-auto py-16 space-y-2">
        {/* Top Image */}
        <img
          src="/error.png" // Replace with your actual image path
          alt="404 Top"
          className="w-[60vw] h-auto mx-auto"
        />

      

        {/* Button */}
        <Link href="/">
          <button className="bg-[#F24E1E] mb-10 -mt-6 text-white py-3 px-8 rounded-lg shadow-md hover:bg-[#D32F2F]">
            Back to Home
          </button>
        </Link>

        {/* Bottom Image */}
        <img
          src="/brand1.png" // Replace with your actual image path
          alt="404 Bottom"
          className="w-[full  h-auto"
        />
      </div>
    </div>
  );
}

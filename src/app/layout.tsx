import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopAnnouncement from "@/app/components/Navbar/TopAnnoucement";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Providers from "./redux/Providers"; // Import the client wrapper

import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import LocomotiveScrollClient to ensure it is only rendered client-side
const LocomotiveScrollClient = dynamic(() => import("./components/LocomotiveScrollClient"), {
  ssr: false, // Disable server-side rendering for this component
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hackathon Ecommerce",
  description: "Hackathon ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap children with a Providers component */}
        <Providers>
          <div data-scroll-container className="overflow-hidden h-auto">
            {/* LocomotiveScrollClient should be placed before any scrollable content */}
            <LocomotiveScrollClient />
            
            <TopAnnouncement />
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopAnnouncement from "@/app/components/Navbar/TopAnnoucement";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Providers from "./redux/Providers"; // Import the client wrapper

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
            {/* LocomotiveScrollClient should be placed before any scrollable content */}
            
            <TopAnnouncement />
            <Navbar />
            {children}
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
